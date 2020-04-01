from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	score = models.IntegerField(default=0)
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

	#in case we use these fields
	#for more complex game
	########
	#current_room = models.CharField(max_length=30,unique=False)
	#item_1 = models.CharField(max_length=128)
	#item_2 = models.CharField(max_length=128)

class Leaderboard(models.Model):
	userp = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
	name = models.CharField(max_length=100)
	lscore = models.IntegerField(default=0)
