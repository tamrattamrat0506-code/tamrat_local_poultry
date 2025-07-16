from django.urls import path
from . import views
from .views import VehicleCreateView, VehicleListView, VehicleDetailView

app_name = 'vehicles'

urlpatterns = [
    path('', views.VehicleListView.as_view(), name='vehicle_list'),
    # ... existing URLs ...
    path('add/', VehicleCreateView.as_view(), name='vehicle_add'),
    path('<slug:slug>/', views.VehicleDetailView.as_view(), name='vehicle_detail'),
    path('category/<slug:slug>/', views.CategoryView.as_view(), name='category'),

    
]