# base\views.py
from django.shortcuts import render
from django.contrib.auth import get_user_model

def base(request):
    User = get_user_model()
    users_count = User.objects.count()
    active_users_count = User.objects.filter(is_active=True).count()
    return render(request, 'base/index.html', {
        'users_count': users_count,
        'active_users_count': active_users_count,
    })