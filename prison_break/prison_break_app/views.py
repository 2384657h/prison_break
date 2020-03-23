from django.shortcuts import render
from django.http import HttpResponse
from prison_break_app.models import UserProfile
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required


# Create your views here.
def index(request):
    return render(request, 'prison_break_app/index.html')

def about(request):
    return render(request, 'prison_break_app/about.html')

@login_required
def play(request):
    return render(request, 'prison_break_app/play.html')

def signup(request):
    logout(request)
    return render(request, 'prison_break_app/Signup.html')

def login(request):
    return render(request, 'prison_break_app/login.html')

def register(request):
    registered = False

    if request.method == "POST":
        user = User.objects.create_user(username=request.POST.get('Username'), password =request.POST.get('Password'), email=request.POST.get('Email'))
        user.save()
        registered = True
    else:
        print("Error not a post request")



    return render(request, 'prison_break_app/signup.html' )

def signin(request):
    if request.method == "POST":
        username = request.POST.get('Username')
        password = request.POST.get('Password')
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                auth_login(request, user)
                return redirect(reverse('prison_break_app:index'))
            else:
                return HttpResponse("Youre account has been disabled")
            
        else:
            print(f"Invalid login details: {username}, {password}")
            return HttpResponse("Invalid login details supplied.")

    else:
        return render(request, 'prison_break_app/login.html')
