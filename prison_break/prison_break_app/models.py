from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	score = models.IntegerField(default=0)
	prevscore = models.IntegerField(default=0)
	picture = models.ImageField(upload_to='profile_image', blank=True)

	#check if newGame
	#=1 if new game
	#=0 if NOT new game
	newGame = models.IntegerField(default=1)


	def __str__(self):
		return self.user.username

class Character(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)

	char_ID = models.IntegerField(default = 0)
	posx = models.IntegerField(default =0)
	posy = models.IntegerField(default =0)

	#record time user has played game on this character
	gametime = models.IntegerField(default=0)

	current_room = models.CharField(max_length=30,unique=False)
	spokeJ = models.IntegerField(default =0)
	spokeT = models.IntegerField(default =0)
	storeroomKey = models.IntegerField(default =0)
	wardenKey = models.IntegerField(default =0)
	escapeKey = models.IntegerField(default =0)
	trophy1 = models.IntegerField(default =0)
	trophy2 = models.IntegerField(default =0)
	trophy3 = models.IntegerField(default =0)
	distracted = models.IntegerField(default =0)

class Leaderboard(models.Model):
	userp = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
	name = models.CharField(max_length=100)
	lscore = models.IntegerField(default=0)
