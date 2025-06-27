from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib import messages as django_messages
from items.models import Item 
from conversation.models import Conversation 
from .forms import MessageForm
from .models import Message

def base(request):
    # Get counts for stats
    User = get_user_model()
    users_count = User.objects.count()
    active_users_count = User.objects.filter(is_active=True).count()
    items_count = Item.objects.count() 
    conversations_count = Conversation.objects.count()

    # Handle message form submission
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
    return render(request, 'base/index.html', {
        'users_count': users_count,
        'active_users_count': active_users_count,
        'items_count': items_count,
        'conversations_count': conversations_count,
        'form': form,
    })

def message_list(request):
    all_messages = Message.objects.all().order_by('-created_at')
    return render(request, 'base/messages.html', {'messages': all_messages})

def about_us(request):
    return render(request, 'base/about_us.html')
def admin_links(request):
    return render(request, 'base/admin_links.html')

def terms(request):
    return render(request, 'base/terms.html')