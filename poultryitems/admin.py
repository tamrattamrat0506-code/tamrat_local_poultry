# poultryitems/admin.py
from django.contrib import admin
from .models import Category, Item, SubImage

# consultancy
from django.contrib import admin
from .models import Consultant, ConsultationService, ConsultationBooking

# eggs for sell
from django.contrib import admin
from .models import EggSeller, EggOrder

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

# eggs for sell
# poultryitems/admin.py


@admin.register(Consultant)
class ConsultantAdmin(admin.ModelAdmin):
    list_display = ['name', 'specialty', 'experience', 'rating', 'is_available']
    list_filter = ['specialty', 'availability', 'is_available']
    search_fields = ['name', 'specialty']

@admin.register(ConsultationService)
class ConsultationServiceAdmin(admin.ModelAdmin):
    list_display = ['consultant', 'service_type', 'price', 'duration']
    list_filter = ['service_type']
    search_fields = ['consultant__name']

@admin.register(ConsultationBooking)
class ConsultationBookingAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'consultant', 'service', 'status', 'preferred_date']
    list_filter = ['status', 'preferred_date']
    readonly_fields = ['created_at']


# eggs for sell

@admin.register(EggSeller)
class EggSellerAdmin(admin.ModelAdmin):
    list_display = ['farm_name', 'city', 'egg_type', 'price_per_dozen', 'quantity_available', 'is_verified', 'is_active']
    list_filter = ['egg_type', 'certification', 'is_verified', 'is_active', 'city']
    search_fields = ['farm_name', 'city', 'owner_name']
    list_editable = ['is_verified', 'is_active']

@admin.register(EggOrder)
class EggOrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'seller', 'customer_name', 'quantity', 'total_price', 'status', 'order_date']
    list_filter = ['status', 'order_date', 'seller']
    search_fields = ['customer_name', 'customer_email', 'customer_phone']
    readonly_fields = ['order_date']