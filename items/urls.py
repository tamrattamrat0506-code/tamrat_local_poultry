from django.urls import path, include
from .views import (
    ItemListView,
    ItemDetailView,
    ItemCreateView,
)


from rest_framework.routers import DefaultRouter
from items.api.views import ItemListAPIView, ItemDetailAPIView


app_name = 'items'



urlpatterns = [
    path('', ItemListView.as_view(), name='item_list'),
    path('<int:pk>/', ItemDetailView.as_view(), name='item_detail'),
    path('create/', ItemCreateView.as_view(), name='item_create'),

    # API views
    path('api/items/', ItemListAPIView.as_view(), name='api_item_list'),
    path('api/items/<int:pk>/', ItemDetailAPIView.as_view(), name='api_item_detail'),


]