import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "prison_break.settings")

import django
django.setup()
from prison_break_app.models import UserProfile, Leaderboard, Character
from django.contrib.auth.models import User

def populate():

	#make new users
	users = [
		{'username':'MadMargaret3',
		'password':'password123',
		'email':'margaretstone@gmail.com',
		'score':8},
		{'username':'xx_Th3D4rkD3str0yer_xx',
		'password':'difficultpassword4260',
		'email':'johnthekid@gmail.com',
		'score':21},
		{'username':'AnonUser46',
		'password':'appliepie1066',
		'email':'bananacake420@gmail.com',
		'score':4},
		{'username':'geoff',
		'password':'qwerty',
		'email':'geoff@gmail.com',
		'score':100}]

	#add each new user to database
	for user in users:
		add_user(user['username'],user['password'],user['email'],user['score'])

	#print out users added
	for user in users:
		print(user['username'] + " added.")


"""
code to register a user with the database
"""
def add_user(username, password,email,score):
	user = User.objects.create_user(username=username, password =password, email=email)
	user.save()
	profile = UserProfile()
	character = Character()
	profile.user = user
	character.user = user
	profile.prevscore = score
	
	profile.save()
	character.save()

if __name__ == '__main__':
	print('Starting Prison_Break population script...')
	populate()