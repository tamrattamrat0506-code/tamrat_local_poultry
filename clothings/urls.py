from django.urls import path
from . import views

app_name = 'clothings'

urlpatterns = [
    path('', views.ClothingListView.as_view(), name='clothing_list'),
    path('create/', views.ClothingCreateView.as_view(), name='clothing_create'),
    path('<slug:slug>/', views.ClothingDetailView.as_view(), name='clothing_detail'),
    path('<slug:slug>/update/', views.ClothingUpdateView.as_view(), name='clothing_update'),
    path('<slug:slug>/delete/', views.ClothingDeleteView.as_view(), name='clothing_delete'),
]