from django.shortcuts import render
from django.http import HttpResponse
from prison_break_app.models import UserProfile, Leaderboard, Character
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import itertools
from django.http import JsonResponse




# Create your views here.
def index(request):
    return render(request, 'prison_break_app/index.html')

def about(request):
    return render(request, 'prison_break_app/about.html')

@login_required
def profile(request):
    return render(request, 'prison_break_app/profile.html')

@login_required
def play(request):
    return render(request, 'prison_break_app/play.html')

def signup(request):
    return render(request, 'prison_break_app/Signup.html')

def login(request):
    return render(request, 'prison_break_app/login.html')


#csrf exempt as no sensitive user data is being passed in POST request
@csrf_exempt
def update_counter(request):
    if request.method == 'POST':
        score_count = request.POST['counter']
        coordX = request.POST['posX']
        coordY = request.POST['posY']
        this_user = request.user
        #increment user score
        this_user.userprofile.score = this_user.userprofile.score + int(score_count)
        this_user.save()
        this_user.userprofile.save()

        if this_user.userprofile.newGame == 0:
            #save character data
            this_user.character.posx = coordX
            this_user.character.posx = coordY
        message = 'update successful'

    return HttpResponse(this_user.username + "score =" + str(this_user.userprofile.score) + " " + str(this_user.character.char_ID) + " with coords: " + str(this_user.character.posx) + "," + str(this_user.character.posy))

#csrf exempt as no sensitive user data is being passed in POST request
@csrf_exempt
def character_select(request):
    if request.method == 'POST':
        character_code = request.POST['character']
        coordX = request.POST['posX']
        coordY = request.POST['posY']
        #make new character for current user
        #fill with data
        character = Character()
        current_user = request.user
        character.user = current_user
        character.char_ID = character_code
        character.posx = coordX
        character.posy = coordY
        #set newgame two zero, i.e. NOT a new game
        current_user.userprofile.newGame = 0
        current_user.save()
        current_user.userprofile.save()
        current_user.character.save()

        message = 'character selected'

    return HttpResponse(message + " with coords: " + str(character.posx) + "," + str(character.posy))



def register(request, backend='django.contrib.auth.backends.ModelBackend'):
    registered = False

    if request.method == "POST":
        user = User.objects.create_user(username=request.POST.get('Username'), password =request.POST.get('Password'), email=request.POST.get('Email'))
        user.save()
        profile = UserProfile()
        profile.user = user
        #set to currently new game
        profile.newGame = 1
        
        if 'profilepic' in request.FILES:
            profile.picture = request.FILES['profilepic']

        profile.save()

        registered = True
        auth_login(request,user, backend='django.contrib.auth.backends.ModelBackend')
    else:
        print("Error not a post request")



    return render(request, 'prison_break_app/signup.html' )


def updatePhoto(request):
    userProfile = UserProfile.objects.get(user = request.user.id)
    userProfile.picture = request.FILES['profilepic']
    userProfile.save()
    return render(request, 'prison_break_app/profile.html')

@csrf_exempt
def updateUsername(request):
    user = request.user
    if Leaderboard.objects.filter(userp=user).exists():
        leaderboardob = Leaderboard.objects.get(userp=user).delete()
    user.username=request.POST.get('username')
    user.save()
    return render(request, 'prison_break_app/profile.html')

def updateEmail(request):
    user = request.user
    user.email=request.POST.get('email')
    user.save()
    return render(request, 'prison_break_app/profile.html')
        


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

@login_required
def userlogout(request):
    logout(request)
    return redirect(reverse('prison_break_app:index'))

def leaderboard(request):
    score_list = {}
    users = User.objects.all()
    

    for theuser in users:
        name = theuser.username
        UserProfile.objects.get_or_create(user=theuser)

        
        score = theuser.userprofile.score

        score_list[name] = score

    sortedscores = {k: v for k, v in sorted(score_list.items(), key=lambda x: x[1], reverse = True)}

    x = itertools.islice(sortedscores.items(), 0, 9)
    
    for key, value in x:
        leaderboard = Leaderboard()
       
        leaderboard.userp = User.objects.get(username=key)
        leaderboard.name = key
        leaderboard.lscore = value
        if Leaderboard.objects.filter(name=leaderboard.name).exists():
            Leaderboard.objects.filter(name=leaderboard.name).update(lscore=leaderboard.lscore)
        else:
            leaderboard.save()



    
    leaderboards = Leaderboard.objects.all()
    context_dict = {}

    context_dict['Leaderboard'] = leaderboards
    
    
    return render(request, 'prison_break_app/leaderboard.html', context=context_dict)

def validate_username(request):
    username = request.GET.get('username', None)
    data = {'is_taken': User.objects.filter(username=username).exists()}
    return JsonResponse(data)



        





