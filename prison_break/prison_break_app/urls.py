from django.urls import path
from prison_break_app import views

app_name = 'prison_break_app'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('play/', views.play, name='play'),
    path('signup/', views.signup, name='signup'),
]