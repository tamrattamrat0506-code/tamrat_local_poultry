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

# consultancy
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.utils.translation import gettext_lazy as _
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Consultant, ConsultationService, ConsultationBooking
from .forms import ConsultationBookingForm

# eggs for sell
from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.db.models import Q
from django.utils.translation import gettext_lazy as _
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from .models import EggSeller, EggOrder
from .forms import EggSellerForm, EggOrderForm, EggSellerFilterForm

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




# consultancy views

def veterinary_consultancy(request):
    consultants = Consultant.objects.filter(is_available=True).prefetch_related('services')
    form = ConsultationBookingForm()

    context = {
        'consultants': consultants,
        'form': form,
    }
    return render(request, 'poultryitems/veterinary_consultancy.html', context)

# A view to handle the AJAX form submission for bookings
@require_POST
@csrf_exempt  # For simplicity in example. For production, handle CSRF properly with AJAX.
def book_consultation(request):
    data = json.loads(request.body)
    
    try:
        # Get consultant and service based on the data sent from the frontend
        consultant_id = data.get('consultant_id')
        service_id = data.get('service_id')
        
        consultant = get_object_or_404(Consultant, id=consultant_id, is_available=True)
        service = get_object_or_404(ConsultationService, id=service_id, consultant=consultant)
        
        # Create a form instance and populate it with data from the request:
        form = ConsultationBookingForm({
            'consultant': consultant.id,
            'service': service.id,
            'user_name': data.get('user_name'),
            'user_email': data.get('user_email'),
            'user_phone': data.get('user_phone'),
            'preferred_date': data.get('preferred_date'),
            'preferred_time': data.get('preferred_time'),
            'message': data.get('message'),
        })
        
        if form.is_valid():
            booking = form.save()
            # Send email notifications here (to consultant and admin)
            return JsonResponse({
                'success': True,
                'message': _('Your consultation request has been submitted successfully! We will contact you shortly.')
            })
        else:
            return JsonResponse({
                'success': False,
                'errors': form.errors
            }, status=400)
            
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': _('An error occurred. Please try again.')
        }, status=500)
    

# eggs for sell


def egg_sellers(request):
    sellers = EggSeller.objects.filter(is_active=True)
    form = EggSellerFilterForm(request.GET or None)
    
    if form.is_valid():
        egg_type = form.cleaned_data.get('egg_type')
        city = form.cleaned_data.get('city')
        min_price = form.cleaned_data.get('min_price')
        max_price = form.cleaned_data.get('max_price')
        certified_only = form.cleaned_data.get('certified_only')
        
        if egg_type:
            sellers = sellers.filter(egg_type=egg_type)
        if city:
            sellers = sellers.filter(city__icontains=city)
        if min_price:
            sellers = sellers.filter(price_per_dozen__gte=min_price)
        if max_price:
            sellers = sellers.filter(price_per_dozen__lte=max_price)
        if certified_only:
            sellers = sellers.filter(~Q(certification='none'))
    
    # Order by verified first, then rating
    sellers = sellers.order_by('-is_verified', '-rating')
    
    context = {
        'sellers': sellers,
        'filter_form': form,
    }
    return render(request, 'poultryitems/egg_sellers.html', context)

def egg_seller_detail(request, pk):
    seller = get_object_or_404(EggSeller, pk=pk, is_active=True)
    order_form = EggOrderForm(initial={'quantity': seller.min_order_quantity})
    
    context = {
        'seller': seller,
        'order_form': order_form,
    }
    return render(request, 'poultryitems/egg_seller_detail.html', context)

@require_POST
@csrf_exempt
def place_egg_order(request):
    try:
        data = json.loads(request.body)
        seller_id = data.get('seller_id')
        
        seller = get_object_or_404(EggSeller, id=seller_id, is_active=True)
        
        form = EggOrderForm({
            'customer_name': data.get('customer_name'),
            'customer_email': data.get('customer_email'),
            'customer_phone': data.get('customer_phone'),
            'customer_address': data.get('customer_address'),
            'quantity': data.get('quantity'),
            'preferred_delivery_date': data.get('preferred_delivery_date'),
            'special_instructions': data.get('special_instructions'),
        })
        
        if form.is_valid():
            order = form.save(commit=False)
            order.seller = seller
            order.total_price = int(data.get('quantity')) * seller.price_per_dozen
            order.save()
            
            # Here you would typically send email notifications
            # send_order_confirmation_email(order)
            
            return JsonResponse({
                'success': True,
                'message': _('Your order has been placed successfully! The seller will contact you soon.'),
                'order_id': order.id
            })
        else:
            return JsonResponse({
                'success': False,
                'errors': form.errors
            }, status=400)
            
    except Exception as e:
        return JsonResponse({
            'success': False,
            'message': _('An error occurred while processing your order. Please try again.')
        }, status=500)

# Admin views for managing sellers
from django.contrib.auth.decorators import login_required, user_passes_test

def is_staff(user):
    return user.is_staff

@login_required
@user_passes_test(is_staff)
def add_egg_seller(request):
    if request.method == 'POST':
        form = EggSellerForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, _('Egg seller added successfully!'))
            return redirect('poultryitems:egg_sellers')
    else:
        form = EggSellerForm()
    
    return render(request, 'poultryitems/add_egg_seller.html', {'form': form})

@login_required
@user_passes_test(is_staff)
def edit_egg_seller(request, pk):
    seller = get_object_or_404(EggSeller, pk=pk)
    if request.method == 'POST':
        form = EggSellerForm(request.POST, instance=seller)
        if form.is_valid():
            form.save()
            messages.success(request, _('Egg seller updated successfully!'))
            return redirect('poultryitems:egg_sellers')
    else:
        form = EggSellerForm(instance=seller)
    
    return render(request, 'poultryitems/edit_egg_seller.html', {'form': form, 'seller': seller})