from .models import *
from rest_framework.serializers import ModelSerializer, SerializerMethodField
from user.serializers import UserSerilizer


class FeedbackSerilizer(ModelSerializer):
    posted_by = SerializerMethodField()

    def get_posted_by(self, obj: Feedback):
        user_serilizer: UserSerilizer = UserSerilizer(obj.posted_by)
        return user_serilizer.data

    class Meta:
        model = Feedback
        fields = ["posted_by", "content", "time", "id"]
