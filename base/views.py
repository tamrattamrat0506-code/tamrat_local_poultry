from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages as django_messages
from poultryitems.models import Item 
from conversation.models import Conversation 
from .forms import MessageForm
from .models import Message


from clothings.models import ClothingItem
from electronics.models import Product
from houses.models import House
from vehicles.models import Vehicle

def base(request):
    User = get_user_model()
    users_count = User.objects.count()
    active_users_count = User.objects.filter(is_active=True).count()
    items_count = Item.objects.count() 
    conversations_count = Conversation.objects.count()

    featured_clothing = ClothingItem.objects.filter(is_featured=True)
    if not featured_clothing.exists():
        featured_clothing = ClothingItem.objects.all()
    featured_clothing = featured_clothing[:6]

    featured_electronics = Product.objects.filter(is_featured=True)
    if not featured_electronics.exists():
        featured_electronics = Product.objects.all()
    featured_electronics = featured_electronics[:6]

    featured_houses = House.objects.filter(is_featured=True)
    if not featured_houses.exists():
        featured_houses = House.objects.all()
    featured_houses = featured_houses[:6]

    featured_poultry = Item.objects.filter(is_featured=True)
    if not featured_poultry.exists():
        featured_poultry = Item.objects.all()
    featured_poultry = featured_poultry[:6]

    featured_vehicles = Vehicle.objects.filter(is_featured=True)
    if not featured_vehicles.exists():
        featured_vehicles = Vehicle.objects.all()
    featured_vehicles = featured_vehicles[:6]

    if request.method == 'POST':
        form = MessageForm(request.POST)
        if form.is_valid():
            Message.objects.create(
                phone=form.cleaned_data['phone'],
                message=form.cleaned_data['message']
            )
            django_messages.success(request, 'Message sent successfully!')
            return redirect('base:index')
    else:
        form = MessageForm()

    # Pass all data to the template
    context = {
        'users_count': users_count,
        'active_users_count': active_users_count,
        'items_count': items_count,
        'conversations_count': conversations_count,
        'form': form,
        'featured_clothing': featured_clothing,
        'featured_electronics': featured_electronics,
        'featured_houses': featured_houses,
        'featured_poultry': featured_poultry,
        'featured_vehicles': featured_vehicles,
    }
    return render(request, 'base/index.html', context)

def message_list(request):
    all_messages = Message.objects.all().order_by('-created_at')
    return render(request, 'base/messages.html', {'messages': all_messages})

def about_us(request):
    return render(request, 'base/about_us.html')
def admin_links(request):
    return render(request, 'base/admin_links.html')

def terms(request):
    return render(request, 'base/terms.html')