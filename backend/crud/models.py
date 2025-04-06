from django.db import models
from django.core.exceptions import ValidationError
from .validators import validate_min_word_count, validate_max_word_count



class Blog(models.Model):
    
    title  = models.CharField(max_length=100)
    content = models.TextField(validators = [validate_min_word_count, validate_max_word_count])
    cover_image = models.ImageField(upload_to="cover_images", blank=True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now = True)
