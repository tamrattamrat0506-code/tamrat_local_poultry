from django.db import models
from django.conf import settings
from cloudinary.models import CloudinaryField

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True) 
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='items', on_delete=models.CASCADE)
    main_image = CloudinaryField('image')
    like_count = models.PositiveIntegerField(default=0)
    share_count = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.name

class SubImage(models.Model):
    item = models.ForeignKey(Item, related_name='sub_images', on_delete=models.CASCADE)
    image = CloudinaryField('image')
    