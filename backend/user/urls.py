from django.urls import path
from .views import *

urlpatterns = [
    path('register/',register),
    path('verify/',verify),
    path('curr-user/',get_curr_user),
]
