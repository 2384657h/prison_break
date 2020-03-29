from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	score = models.IntegerField(default=0)
	picture = models.ImageField(upload_to='profile_image', blank=True)


	def __str__(self):
		return self.user.username

class Character(models.Model):
	char_ID = models.CharField(max_length=30,unique=True)
	current_room = models.CharField(max_length=30,unique=False)
	item_1 = models.CharField(max_length=128)
	item_2 = models.CharField(max_length=128)

class Leaderboard(models.Model):
	user = models.OneToOneField(UserProfile, on_delete=models.CASCADE, default=None)
	name = models.CharField(max_length=100)
	lscore = models.IntegerField(default=0)
