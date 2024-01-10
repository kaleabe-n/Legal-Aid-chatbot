from rest_framework.serializers import ModelSerializer,SerializerMethodField
from django.contrib.auth.models import User

class UserSerilizer(ModelSerializer):
    full_name:str = SerializerMethodField()
    email:str = SerializerMethodField()
    
    def get_full_name(self,user:User):
        return user.first_name
    
    def get_email(self,user:User):
        return user.username
    
    class Meta:
        model = User
        fields = ['email','full_name','is_superuser']