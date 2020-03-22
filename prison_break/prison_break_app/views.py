from django.shortcuts import render
from django.http import HttpResponse
from prison_break_app.models import UserProfile
from django.contrib.auth.models import User


# Create your views here.
def index(request):
    return render(request, 'prison_break_app/index.html')

def about(request):
    return render(request, 'prison_break_app/about.html')

def play(request):
    return render(request, 'prison_break_app/play.html')

def signup(request):
    return render(request, 'prison_break_app/Signup.html')

def register(request):
    registered = False

    if request.method == "POST":
        data = request.POST.copy()
        user = User.objects.create_user(username=request.POST.get('Username'), password =request.POST.get('Password'), email=request.POST.get('Email'))
        user.save()
        registered = True
    else:
        print("Error not a post request")



    return render(request, 'prison_break_app/signup.html' )
