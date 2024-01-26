from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Feedback(models.Model):
    content = models.TextField()
    posted_by = models.ForeignKey(User, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-time"]

    def __str__(self) -> str:
        return self.content[:20]
