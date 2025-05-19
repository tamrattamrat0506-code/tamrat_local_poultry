from django.urls import path
from . import views

app_name = 'contact'

urlpatterns = [
    path('', views.contact_us, name='contact_us'),
    path('received_messages/', views.received_messages, name='received_messages'),
]