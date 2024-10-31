from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title



class CustomUser(AbstractUser):
    isAdmin = models.BooleanField(default=False)
