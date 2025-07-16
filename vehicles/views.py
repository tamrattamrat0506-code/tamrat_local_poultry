# vehicles/views.py
from django.views.generic import ListView, DetailView
from .models import Vehicle, VehicleCategory
from django.views.generic import CreateView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import VehicleForm
from .models import VehicleImage

class VehicleListView(ListView):
    model = Vehicle
    template_name = 'vehicles/vehicle_list.html'
    context_object_name = 'vehicles'
    paginate_by = 12

    def get_queryset(self):
        return Vehicle.objects.filter(is_featured=True)

class VehicleDetailView(DetailView):
    model = Vehicle
    template_name = 'vehicles/vehicle_detail.html'
    context_object_name = 'vehicle'
    slug_field = 'slug'

class CategoryView(ListView):
    model = Vehicle
    template_name = 'vehicles/vehicle_list.html'
    context_object_name = 'vehicles'
    paginate_by = 12

    def get_queryset(self):
        return Vehicle.objects.filter(category__slug=self.kwargs['slug'])


class VehicleCreateView(LoginRequiredMixin, CreateView):
    model = Vehicle
    form_class = VehicleForm
    template_name = 'vehicles/vehicle_form.html'
    success_url = reverse_lazy('vehicles:vehicle_list')
    
    def form_valid(self, form):
        form.instance.created_by = self.request.user
        response = super().form_valid(form)
        
        # Handle multiple image uploads
        if self.request.FILES.getlist('images'):
            for img in self.request.FILES.getlist('images'):
                VehicleImage.objects.create(
                    vehicle=self.object,
                    image=img
                )
        return response