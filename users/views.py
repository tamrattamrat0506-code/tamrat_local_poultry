# users\views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileUpdateForm
from django.conf import settings
from .models import Profile

from django.http import JsonResponse
from conversation.models import Conversation, ConversationMessage 



from django.contrib.auth import get_user_model


from .models import CustomUser

@login_required
def unread_count_api(request):
    """API endpoint to get unread message count"""
    conversations = Conversation.objects.filter(members=request.user)
    total_unread = sum(
        ConversationMessage.objects.filter(
            conversation=conv,
            is_read=False
        ).exclude(created_by=request.user).count()
        for conv in conversations
    )
    return JsonResponse({'total_unread': total_unread})

def user_logout(request):
    """Logout view"""
    auth_logout(request)
    return redirect('base:index')

@login_required
def dashboard(request):
    """Dashboard view after successful login"""
    return render(request, 'users/dashboard.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('users:profile-update')

    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        phone_number = request.POST.get('phone_number')

        from django.contrib.auth import authenticate, login
        user = authenticate(request, username=username, phone_number=phone_number)
        if user:
            login(request, user)
            return redirect('users:dashboard')
        else:
            return render(request, 'users/login.html', {
                'error': 'Invalid username or phone number'
            })
    return render(request, 'users/login.html')


@login_required
def profile_update(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect('users:dashboard')
    else:
        form = ProfileUpdateForm(instance=request.user.profile)
    return render(request, 'users/profile_update.html', {'form': form})


@login_required
def profile(request):
    """View for displaying the user's profile"""
    return render(request, 'users/profile.html', {'user': request.user})

def seller_profile(request, user_id):
    User = get_user_model()
    seller = get_object_or_404(User, id=user_id)
    return render(request, 'users/seller_profile.html', {'seller': seller})

@login_required
def user_list(request):
    users = CustomUser.objects.all().select_related('profile')
    return render(request, 'users/users.html', {'users': users})