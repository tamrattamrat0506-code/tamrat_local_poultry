from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, CreateView
from .models import Item, SubImage
from .forms import ItemForm
from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin

class ItemListView(ListView):
    model = Item
    template_name = 'items/item_list.html'
    context_object_name = 'items'
    paginate_by = 12
    ordering = ['-created_at']

class ItemDetailView(DetailView):
    model = Item
    template_name = 'items/item_detail.html'
    context_object_name = 'item'

class ItemCreateView(CreateView):
    model = Item
    form_class = ItemForm
    template_name = 'items/item_create.html'
    success_message = "Item was created successfully!"

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.created_by = self.request.user
        
        item = form.save()
        
        for img in self.request.FILES.getlist('sub_images'):
            SubImage.objects.create(item=item, image=img)
        messages.success(self.request, self.success_message)
        return redirect('items:item_detail', pk=item.pk)