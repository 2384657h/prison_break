from django.db import models
from django.contrib.auth.models import User

"""
used to store all the data for user such as scores and profile picture, linked to user by username

"""
class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	score = models.IntegerField(default=0)
	prevscore = models.IntegerField(default=0)
	picture = models.ImageField(upload_to='profile_image', blank=True)

	#check if newGame
	#=1 if new game
	#=0 if NOT new game
	hasCharacter = models.IntegerField(default =0)
	newGame = models.IntegerField(default=1)


	def __str__(self):
		return self.user.username


"""
Stores all the data for a save state of the game, allows game reloading
"""
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

"""
each instance is a object to show in leaderboard, each object is one row with the user
and score, the photo is got from the user
"""
class Leaderboard(models.Model):
	userp = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
	name = models.CharField(max_length=100)
	lscore = models.IntegerField(default=0)
