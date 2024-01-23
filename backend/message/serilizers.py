from rest_framework.serializers import ModelSerializer,SerializerMethodField
from user.serializers import UserSerilizer
from .models import *

class MessageSerilizer(ModelSerializer):
    
    user = SerializerMethodField()
    
    def get_user(self,obj):
        user = obj.user
        user_serilizer:UserSerilizer = UserSerilizer(user)
        return user_serilizer.data
        
    class Meta:
        model = Message
        fields = ['content','id','user','time','is_user_message']