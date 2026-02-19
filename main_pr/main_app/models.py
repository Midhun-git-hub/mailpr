from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class UserPreference(models.Model):
    FREQUENT_CHOICE = [
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name='preference')
    receive_motivation = models.BooleanField(default=False)
    receive_finance = models.BooleanField(default=False)
    receive_stocks = models.BooleanField(default=False)
    receive_workout = models.BooleanField(default=False)
    frequency = models.CharField(max_length=10, choices=FREQUENT_CHOICE)
    
    def __str__(self):
        return self.user.username
    