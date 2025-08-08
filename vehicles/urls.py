# project\vehicles\urls.py
from django.urls import path
from . import views
from .views import like_vehicle, share_vehicle, VehicleCreateView, VehicleListView, VehicleDetailView 

app_name = 'vehicles'

urlpatterns = [
    path('', views.VehicleListView.as_view(), name='vehicle_list'),
    path('add/', VehicleCreateView.as_view(), name='vehicle_add'),
    path('<slug:slug>/', views.VehicleDetailView.as_view(), name='vehicle_detail'),
    path('category/<slug:slug>/', views.CategoryView.as_view(), name='category'),
    path('<slug:slug>/edit/', views.VehicleEditView.as_view(), name='vehicle_edit'),
    path('<slug:slug>/delete/', views.VehicleDeleteView.as_view(), name='vehicle_delete'),
    path('vehicle/<int:vehicle_id>/like/', like_vehicle, name='like_vehicle'),
    path('vehicle/<int:vehicle_id>/share/', share_vehicle, name='share_vehicle'),
]