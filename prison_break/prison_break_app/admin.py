from django.contrib import admin
from prison_break_app.models import UserProfile, Leaderboard, Character

# Registers the models for use within the admin panel

admin.site.register(UserProfile)
admin.site.register(Leaderboard)
admin.site.register(Character)
