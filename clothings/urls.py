from django.urls import path
from . import views

app_name = 'clothings'

urlpatterns = [
    path('', views.ClothingListView.as_view(), name='clothing_list'),
    path('create/', views.ClothingCreateView.as_view(), name='clothing_create'),
    path('category/<slug:slug>/', views.CategoryView.as_view(), name='category'),
    path('gender/<str:gender>/', views.GenderView.as_view(), name='gender'),
    path('search/', views.ClothingSearchView.as_view(), name='search'),
    path('<slug:slug>/', views.ClothingDetailView.as_view(), name='clothing_detail'),

    path('<slug:slug>/update/', views.ClothingUpdateView.as_view(), name='clothing_update'),
    
    path('<slug:slug>/delete/', views.ClothingDeleteView.as_view(), name='clothing_delete'),
]