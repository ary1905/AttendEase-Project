from django.db import models
from datetime import timedelta, datetime
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import random
import string

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save()

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=10)
    user_type = models.CharField(max_length=50)
    facultyId = models.CharField(max_length=8, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    subjects = models.CharField(max_length=100, blank=True, null=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'phone_number', 'user_type']

    def get_full_name(self):
        return self.first_name

    def get_short_name(self):
        return self.first_name
    
    def generate_faculty_id(self):
        if self.user_type == 'FC':
            return 'FC' + ''.join(random.choices(string.digits, k=6))
        else:
            return 'ST' + ''.join(random.choices(string.digits, k=6))
            

    def save(self, *args, **kwargs):
        if not self.facultyId:
            self.facultyId = self.generate_faculty_id()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email
    

class UserAccountNotice(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.TextField(max_length=255)
    description = models.TextField()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
class StudentFacultySubjectTable(models.Model):
    facultyId = models.CharField(max_length=8, unique=False)
    studentId = models.CharField(max_length=8, unique=False)
    subject = models.CharField(max_length=50)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        
class StudentAttendenceTable(models.Model):
    facultyId = models.CharField(max_length=8, unique=False)
    studentId = models.CharField(max_length=8, unique=False)
    subject = models.CharField(max_length=50)
    class_held_date = models.DateField(auto_now=False, auto_now_add=False)
    present = models.BooleanField(default = False)
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

