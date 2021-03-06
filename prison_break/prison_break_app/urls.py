from django.urls import path
from prison_break_app import views
from prison_break_app.views import update_counter

app_name = 'prison_break_app'
"""
simply the url address and the page to redirect it to, also a name for it so we could use the : operator instead of full paths
"""
urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('play/', views.play, name='play'),
    path('signup/', views.signup, name='signup'),
    path('register/', views.register, name='register'),
    path('update_counter/', views.update_counter, name='update_counter'),
    path('character_select/', views.character_select, name='character_select'),
    path('end_game/', views.end_game, name='end_game'),
    path('login/', views.login, name='login'),
    path('signin/', views.signin, name='signin'),
    path('profile/', views.profile, name='profile'),
    path('logout/', views.userlogout, name='logout'),
    path('updatePhoto', views.updatePhoto, name='updatePhoto'),
    path('updateUsername', views.updateUsername, name='updateUsername'),
    path('updateEmail', views.updateEmail, name='updateEmail'),
    path('leaderboard/', views.leaderboard, name='leaderboard'),
    path('ajax/validate_username/', views.validate_username, name='validate_username'),
    path('delete/', views.deleteacc, name='delete'),
    path('terms/', views.terms, name='terms'),
    path('privacy/', views.privacypol, name='privacy'),
]