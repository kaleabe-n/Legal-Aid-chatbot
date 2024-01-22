from django.urls import path
from .views import *

urlpatterns = [
    path("message/",message_api),
    path("message/single/<str:pk>/",single_message_api),
    path("message/user/<str:email>/",get_message_by_user)
]