# poultryitems/urls.py
from django.urls import path, include
from . import views
from .views import (
    ItemListView,
    ItemDetailView,
    ItemCreateView,
    item_edit,
    item_delete,
)
from rest_framework.routers import DefaultRouter
from poultryitems.api.views import ItemListAPIView, ItemDetailAPIView


app_name = 'poultryitems'



urlpatterns = [
    path('', ItemListView.as_view(), name='item_list'),
    path('<int:pk>/', ItemDetailView.as_view(), name='item_detail'),
    path('create/', ItemCreateView.as_view(), name='item_create'),

    # poultry home page index.html
    path('poultry/', views.index, name='index'),
    
    # API views
    path('api/items/', ItemListAPIView.as_view(), name='api_item_list'),
    path('api/items/<int:pk>/', ItemDetailAPIView.as_view(), name='api_item_detail'),
    path('<int:pk>/edit/', item_edit, name='item_edit'),
    path('<int:pk>/delete/', item_delete, name='item_delete'),

    # like and share
    path('<int:pk>/like/', views.like_item, name='item_like'),
    path('<int:pk>/share/', views.share_item, name='item_share'),

    # add to cart
    path('<int:pk>/add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('cart/', views.view_cart, name='view_cart'),
    path('cart/remove/<int:pk>/', views.remove_from_cart, name='remove_from_cart'),
    path('cart/update/<int:pk>/', views.update_cart_item, name='update_cart_item'),

]