# electronics/views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .models import Product
from .forms import ProductForm
from .models import ProductImage


def product_list(request):
    products = Product.objects.select_related('category', 'seller').all()
    return render(request, 'electronics/product_list.html', {'products': products})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'electronics/product_detail.html', {
        'product': product
    })

@login_required
def product_create(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False)
            product.seller = request.user
            product.save()
            for image in request.FILES.getlist('images'):
                ProductImage.objects.create(
                    product=product,
                    image=image,
                    alt_text=product.name
                )
            messages.success(request, 'Product added successfully.')
            return redirect('electronics:product_detail', pk=product.pk)
    else:
        form = ProductForm()
    return render(request, 'electronics/product_form.html', {'form': form})

@login_required
def product_update(request, pk):
    product = get_object_or_404(Product, pk=pk, seller=request.user)
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, 'Product updated.')
            return redirect('electronics:product_detail', pk=pk)
    else:
        form = ProductForm(instance=product)
    return render(request, 'electronics/product_form.html', {'form': form})

@login_required
def product_delete(request, pk):
    product = get_object_or_404(Product, pk=pk, seller=request.user)
    if request.method == 'POST':
        product.delete()
        messages.success(request, 'Product deleted.')
        return redirect('electronics:product_list')
    return render(request, 'electronics/product_confirm_delete.html', {'product': product})

