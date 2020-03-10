from django.db import models

class User(models.Model):
	#each score on leaderboard shows name and score
	user_name = models.CharField(max_length=30,unique=False)
	score = models.IntegerField(default=0)
	email = models.CharField(max_length=30,unique=True)
	character = models.CharField(max_length=30)


	def __str__(self):
		return self.name

class Character(models.Model):
	char_ID = models.CharField(max_length=30,unique=True)
	current_room = models.CharField(max_length=30,unique=False)
	item_1 = models.CharField(max_length=128)
	item_2 = models.CharField(max_length=128)

class Leaderboard(models.Model):
	user_score = models.ForeignKey(User, on_delete=models.CASCADE)

	def __str__(self):
		return self.title

	class Meta:
		ordering = ['user_score']
