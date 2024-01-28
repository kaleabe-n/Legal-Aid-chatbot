from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Message(models.Model):
    content = models.TextField()
    user = models.ForeignKey(to=User,on_delete=models.CASCADE)
    is_user_message = models.BooleanField()
    time = models.DateTimeField(auto_now=True)
    
    
    class Meta:
        ordering = ["-time"]
        
    def __str__(self) -> str:
        return self.content[:20] + self.user.email + ("by user" if self.is_user_message else "by model")
    