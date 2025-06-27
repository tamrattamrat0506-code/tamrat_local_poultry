# item/admin.py
from django.contrib import admin
from .models import Item, SubImage

class SubImageInline(admin.TabularInline):
    model = SubImage
    extra = 1

class ItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'created_at']
    inlines = [SubImageInline]

admin.site.register(Item, ItemAdmin)