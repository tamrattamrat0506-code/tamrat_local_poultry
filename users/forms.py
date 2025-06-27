from django import forms
from .models import CustomUser, Profile

class UserRegisterForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'phone_number']

class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['profile_picture', 'user_name', 'bio', 'location']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 3}),
        }
