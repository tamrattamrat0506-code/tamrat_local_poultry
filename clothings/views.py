# closings/views.py
from django.views.generic import ListView, DetailView
from django.db.models import Q
from .models import ClothingCategory, ClothingItem
from .forms import ClothingCreateForm
from django.views.generic import CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.utils.text import slugify

class ClothingListView(ListView):
    model = ClothingItem
    template_name = 'clothings/clothing_list.html'
    context_object_name = 'clothes'
    paginate_by = 12
    
    def get_queryset(self):
        return ClothingItem.objects.filter(stock_quantity__gt=0).order_by('-is_featured', '-created_at')

class CategoryView(ListView):
    model = ClothingItem
    template_name = 'clothings/clothing_list.html'
    context_object_name = 'clothes'
    paginate_by = 12
    
    def get_queryset(self):
        return ClothingItem.objects.filter(
            category__slug=self.kwargs['slug'],
            stock_quantity__gt=0
        ).order_by('-is_featured', '-created_at')

class GenderView(ListView):
    model = ClothingItem
    template_name = 'clothings/clothing_list.html'
    context_object_name = 'clothes'
    paginate_by = 12
    
    def get_queryset(self):
        gender = self.kwargs['gender'].upper()
        return ClothingItem.objects.filter(
            category__gender=gender,
            stock_quantity__gt=0
        ).order_by('-is_featured', '-created_at')

class ClothingSearchView(ListView):
    model = ClothingItem
    template_name = 'clothings/clothing_list.html'
    context_object_name = 'clothes'
    paginate_by = 12
    
    def get_queryset(self):
        query = self.request.GET.get('q')
        return ClothingItem.objects.filter(
            Q(name__icontains=query) |
            Q(description__icontains=query) |
            Q(brand__icontains=query),
            stock_quantity__gt=0
        ).order_by('-is_featured', '-created_at')

class ClothingDetailView(DetailView):
    model = ClothingItem
    template_name = 'clothings/clothing_detail.html'
    context_object_name = 'clothing'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['related_items'] = ClothingItem.objects.filter(
            category=self.object.category
        ).exclude(
            pk=self.object.pk
        )[:4]
        return context

class ClothingCreateView(CreateView):
    model = ClothingItem
    form_class = ClothingCreateForm
    template_name = 'clothings/clothing_create.html'
    
    def form_valid(self, form):
        form.instance.slug = slugify(form.instance.name)
        return super().form_valid(form)
    
    def get_success_url(self):
        return reverse_lazy('clothings:clothing_detail', kwargs={'slug': self.object.slug})

class ClothingUpdateView(UpdateView):
    model = ClothingItem
    form_class = ClothingCreateForm 
    template_name = 'clothings/clothing_create.html'
    
    def get_success_url(self):
        return reverse_lazy('clothings:clothing_detail', kwargs={'slug': self.object.slug})


class ClothingDeleteView(DeleteView):
    model = ClothingItem
    template_name = 'clothings/clothing_confirm_delete.html'
    success_url = reverse_lazy('clothings:clothing_list')
