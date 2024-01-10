from django.db import models
import uuid

# Create your models here.

class Verification(models.Model):
    full_name:str = models.CharField(max_length=50)
    password:str = models.CharField(max_length=500)
    username:str = models.CharField(max_length=50)
    code = models.UUIDField(primary_key=True,default=uuid.uuid4,unique=True)

    