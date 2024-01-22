from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Message(models.Model):
    content = models.TextField()
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    is_user_message = models.BooleanField()
    time = models.DateTimeField(auto_now=True)
    