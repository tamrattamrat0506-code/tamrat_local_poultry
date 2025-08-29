# poultryitems/views.py
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
from django.contrib.auth.decorators import login_required

from cart.models import CartItem
from cart.views import _get_cart
from django.contrib.contenttypes.models import ContentType

@login_required
@require_POST
def add_to_cart(request, pk):
    item = get_object_or_404(Item, pk=pk)
    cart = _get_cart(request)
    item_ct = ContentType.objects.get_for_model(Item)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        content_type=item_ct,
        object_id=item.id
    )

    if created:
        message = "Item added to cart."
    else:
        message = "Item is already in the cart."

    return JsonResponse({'status': 'success', 'message': message}) 
    item = get_object_or_404(Item, pk=pk)
    cart = _get_cart(request)
    item_ct = ContentType.objects.get_for_model(Item)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        content_type=item_ct,
        object_id=item.id
    )
    
    if created:
        message = "Item added to cart."
    else:
        message = "Item is already in the cart."
    
    return JsonResponse({'status': 'success', 'message': message})

def index(request):

    featured_products = Item.objects.all().order_by('-created_at')[:3] 
    context = {
        'featured_products': featured_products
    }
    return render(request, 'poultryitems/index.html', context)

class ItemListView(ListView):
    model = Item
    template_name = 'poultryitems/item_list.html'
    context_object_name = 'items'
    paginate_by = 12
    ordering = ['-created_at']

class ItemDetailView(DetailView):
    model = Item
    template_name = 'poultryitems/item_detail.html'
    context_object_name = 'item'
    
class ItemCreateView(LoginRequiredMixin, CreateView):
    model = Item
    form_class = ItemForm
    template_name = 'poultryitems/item_create.html'
    success_message = "Item was created successfully!"
    login_url = 'login'

    def form_valid(self, form):
        if self.request.user.is_authenticated:
            form.instance.created_by = self.request.user
        
        item = form.save()
        
        for img in self.request.FILES.getlist('sub_images'):
            SubImage.objects.create(item=item, image=img)
        messages.success(self.request, self.success_message)
        return redirect('poultryitems:item_detail', pk=item.pk)

def item_edit(request, pk):
    item = get_object_or_404(Item, pk=pk)
    if request.method == 'POST':
        form = ItemForm(request.POST, request.FILES, instance=item)
        if form.is_valid():
            form.save()
            return redirect('poultryitems:item_detail', pk=item.pk)
    else:
        form = ItemForm(instance=item)
    return render(request, 'poultryitems/item_create.html', {'form': form})

def item_delete(request, pk):
    item = get_object_or_404(Item, pk=pk)
    if request.method == 'POST':
        item.delete()
    return redirect('poultryitems:item_list')

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



#egg sellers, chicken sellers, poultry trainings and veterinary consultancy
def egg_sellers(request):
    return render(request, 'poultryitems/egg_sellers.html')

def chicken_sellers(request):
    return render(request, 'poultryitems/chicken_sellers.html')

def poultry_trainings(request):
    return render(request, 'poultryitems/poultry_trainings.html')

def veterinary_consultancy(request):
    return render(request, 'poultryitems/veterinary_consultancy.html')