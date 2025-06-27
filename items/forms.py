from django import forms
from .models import Item, SubImage

class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True

class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data]
        else:
            result = single_file_clean(data, initial)
        return result

class ItemForm(forms.ModelForm):
    sub_images = MultipleFileField(required=False, label='Additional Images')

    class Meta:
        model = Item
        fields = ['name', 'description', 'price', 'main_image']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['main_image'].required = True
        self.fields['main_image'].widget.attrs.update({'class': 'form-control'})
        self.fields['name'].widget.attrs.update({'class': 'form-control'})
        self.fields['description'].widget.attrs.update({'class': 'form-control'})
        self.fields['price'].widget.attrs.update({'class': 'form-control'})
        self.fields['sub_images'].widget.attrs.update({
            'class': 'form-control',
            'placeholder': 'Upload additional images',
        })

    def save(self, commit=True):
        item = super().save(commit=commit)
        
        if commit and self.files.getlist('sub_images'):
            for img in self.files.getlist('sub_images'):
                SubImage.objects.create(item=item, image=img) 
        
        return item