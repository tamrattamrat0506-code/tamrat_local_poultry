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
from .models import Cart, CartItem

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
    return render(request, 'poultryitems/item_confirm_delete.html', {'item': item})

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

@login_required
def view_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    return render(request, 'poultryitems/cart.html', {'cart': cart})

@require_POST
@login_required
def add_to_cart(request, pk):
    item = get_object_or_404(Item, pk=pk)
    cart, created = Cart.objects.get_or_create(user=request.user)
    
    # Check if item already in cart
    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        item=item,
        defaults={'quantity': 1}
    )
    
    if not created:
        cart_item.quantity += 1
        cart_item.save()
    
    return JsonResponse({
        'message': 'Item added to cart',
        'cart_count': cart.items.count(),
        'item_total': cart_item.total_price,
        'cart_total': cart.total_price
    })

@require_POST
@login_required
def remove_from_cart(request, pk):
    cart_item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
    cart_item.delete()
    return JsonResponse({
        'message': 'Item removed from cart',
        'cart_count': request.user.cart.items.count(),
        'cart_total': request.user.cart.total_price
    })

@require_POST
@login_required
def update_cart_item(request, pk):
    cart_item = get_object_or_404(CartItem, pk=pk, cart__user=request.user)
    quantity = request.POST.get('quantity', 1)
    
    try:
        quantity = int(quantity)
        if quantity > 0:
            cart_item.quantity = quantity
            cart_item.save()
        else:
            cart_item.delete()
    except ValueError:
        pass
    
    return JsonResponse({
        'message': 'Cart updated',
        'item_total': cart_item.total_price,
        'cart_total': request.user.cart.total_price
    })