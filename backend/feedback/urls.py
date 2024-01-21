from django.urls import path
from .views import *

urlpatterns = [
    path("feedback/", feedback_api),
    path("feedback/my/", get_my_feedbacks),
    path("feedback/<str:pk>/", modify_feedback_api),
    path("feedback/user/<str:email>/", get_feedback_by_user),
]
