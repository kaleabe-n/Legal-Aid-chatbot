from django.urls import path
from .views import *

urlpatterns = [
    path('user/register/',register),
    path('user/verify/',verify),
    path('user/curr-user/',get_curr_user),
    path('user/all/',get_all_users),
    path('user/update/',update_user),
    path('user/single/<str:email>/',get_single_user)
]
