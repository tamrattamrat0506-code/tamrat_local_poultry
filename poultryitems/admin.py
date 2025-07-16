# poultryitems/admin.py
from django.contrib import admin
from .models import Category, Item, SubImage, Cart, CartItem

class SubImageInline(admin.TabularInline):
    model = SubImage
    extra = 1

class ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'get_category', 'get_is_featured', 'get_in_stock')
    list_filter = ('category', 'is_featured')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [SubImageInline]

    def get_category(self, obj):
        return obj.category.name if obj.category else '-'
    get_category.short_description = 'Category'
    get_category.admin_order_field = 'category__name'
    
    def get_is_featured(self, obj):
        return obj.is_featured
    get_is_featured.boolean = True
    get_is_featured.short_description = 'Featured'
    
    def get_in_stock(self, obj):
        return obj.in_stock
    get_in_stock.boolean = True
    get_in_stock.short_description = 'In Stock'

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)}
    list_display = ('name', 'slug')

admin.site.register(Cart)
admin.site.register(CartItem)