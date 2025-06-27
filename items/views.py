from django.shortcuts import render, redirect, get_object_or_404
from django.views.generic import ListView, DetailView, CreateView
from .models import Item, SubImage
from .forms import ItemForm
from django.contrib import messages
from django.contrib.messages.views import SuccessMessageMixin

from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.mixins import LoginRequiredMixin

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
    
class ItemCreateView(LoginRequiredMixin, CreateView):
    model = Item
    form_class = ItemForm
    template_name = 'items/item_create.html'
    success_message = "Item was created successfully!"
    login_url = 'login'

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.created_by = self.request.user
        
        item = form.save()
        
        for img in self.request.FILES.getlist('sub_images'):
            SubImage.objects.create(item=item, image=img)
        messages.success(self.request, self.success_message)
        return redirect('items:item_detail', pk=item.pk)




def item_edit(request, pk):
    item = get_object_or_404(Item, pk=pk)
    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES, instance=item)
        if form.is_valid():
            form.save()
            return redirect('items:item_detail', pk=item.pk)
    else:
        form = ItemForm(instance=item)
    return render(request, 'items/item_create.html', {'form': form})

def item_delete(request, pk):
    item = get_object_or_404(Item, pk=pk)
    if request.method == 'POST':
        item.delete()
        return redirect('items:item_list')  # Redirect to item list after deletion
    return render(request, 'items/item_confirm_delete.html', {'item': item})

def like_item(request, pk):
    item = get_object_or_404(Item, pk=pk)
    item.like_count += 1
    item.save()
    return JsonResponse({'likes': item.like_count})

def share_item(request, pk):
    item = get_object_or_404(Item, pk=pk)
    item.share_count += 1
    item.save()
    return JsonResponse({'shares': item.share_count})



