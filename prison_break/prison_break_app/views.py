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
#all the simple viewes are here, just return a render of a page
def index(request):
    return render(request, 'prison_break_app/index.html')

def about(request):
    return render(request, 'prison_break_app/about.html')

def terms(request):
    return render(request, 'prison_break_app/tos.html')

def privacypol(request):
    return render(request, 'prison_break_app/privacypol.html')
 #Checks the user is logged in to view these pages
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
        time_count = request.POST['counter']
        coordX = request.POST['posX']
        coordY = request.POST['posY']
        this_user = request.user


        #increment user score
        this_user.save()
        message = 'save successful'

        if this_user.userprofile.newGame == 0:
            #save character data
            #increment current time
            this_user.character.gametime = this_user.character.gametime + int(float(time_count))
            this_user.character.posx = coordX
            this_user.character.posy = coordY
            this_user.character.char_ID = request.POST['character_code']
            this_user.character.current_room = request.POST['current_room']
            this_user.character.trophy1 = request.POST['trophy1']
            this_user.character.trophy2 = request.POST['trophy2']
            this_user.character.trophy3 = request.POST['trophy3']
            this_user.character.escapeKey = request.POST['escapeKey']
            this_user.character.wardenKey = request.POST['wardenKey']
            this_user.character.storeroomKey = request.POST['storageKey']
            this_user.character.spokeT = request.POST['spokeT']
            this_user.character.spokeJ = request.POST['spokeJ']
            this_user.character.distracted = request.POST['distracted']
            this_user.character.save()

            message = message + " " + this_user.character.current_room 
        

    return HttpResponse(message)

#csrf exempt as no sensitive user data is being passed in POST request
@csrf_exempt
def character_select(request):
    if request.method == 'POST':
        character_code = request.POST['character']
        #check if user has character already
        current_user = request.user
        if current_user.userprofile.hasCharacter ==0:
            #if they dont then create new character
            character = Character()
            character.user = current_user
            character.char_ID = character_code
            current_user.userprofile.hasCharacter=1
        else:
            current_user.character.char_ID=character_code
        
        
        
        #set newgame two zero, i.e. NOT a new game
        current_user.userprofile.newGame = 0
        current_user.save()
        current_user.userprofile.save()
        current_user.character.save()

        message = 'character selected'

    return HttpResponse(message)


@csrf_exempt
def end_game(request):
    if request.method == 'POST':
        this_user = request.user
        finalscore = request.POST['finalscore']
        if this_user.userprofile.prevscore <= int(finalscore):
            this_user.userprofile.prevscore = int(finalscore)

        this_user.userprofile.score = 0
        this_user.userprofile.newGame = 1

        #RESET ALL CHARACTER DATA
        this_user.character.char_ID = 0
        this_user.character.trophy1 = 0
        this_user.character.trophy2 = 0
        this_user.character.trophy3 = 0
        this_user.character.escapeKey = 0
        this_user.character.wardenKey = 0
        this_user.character.storeroomKey = 0
        this_user.character.spokeT = 0
        this_user.character.spokeJ = 0
        this_user.character.distracted = 0
        this_user.character.current_room = ""
        this_user.save()
        this_user.userprofile.save()
        this_user.character.save()

        message = 'game finished'

    return HttpResponse(message + " with score: " + str(this_user.userprofile.prevscore))


#view for registering user in database
def register(request, backend='django.contrib.auth.backends.ModelBackend'):
    registered = False
    #make suree its a post request, otherwise send back an error
    if request.method == "POST":
        #create new user object with username and password and email from post data
        user = User.objects.create_user(username=request.POST.get('Username'), password =request.POST.get('Password'), email=request.POST.get('Email'))
        user.save()
        #create a profile and attach it to the user
        profile = UserProfile()
        profile.user = user
        #set to currently new game
        profile.prevscore = 0
        profile.score = 0
        profile.newGame = 1
        
        #assign the profile picture if supplied
        if 'profilepic' in request.FILES:
            profile.picture = request.FILES['profilepic']

        profile.save()

        registered = True
        #log the user in
        auth_login(request,user, backend='django.contrib.auth.backends.ModelBackend')
    else:
        print("Error not a post request")



    return render(request, 'prison_break_app/index.html' )

#change the photo for a profile
def updatePhoto(request):
    #find the object holding the user profile to be changed
    userProfile = UserProfile.objects.get(user = request.user.id)
    #set the new photo
    userProfile.picture = request.FILES['profilepic']
    userProfile.save()
    return render(request, 'prison_break_app/profile.html')

#change the username of the current account
@csrf_exempt
def updateUsername(request):
    #get the user object to change the name of 
    user = request.user
    #remove leaderboard objects for old username, they will be automatically reecreated with new name
    if Leaderboard.objects.filter(userp=user).exists():
        leaderboardob = Leaderboard.objects.get(userp=user).delete()
    #change the username
    user.username=request.POST.get('username')
    user.save()
    return render(request, 'prison_break_app/profile.html')

#change email associated with current user
def updateEmail(request):
    #get user from request data, change email and save
    user = request.user
    user.email=request.POST.get('email')
    user.save()
    return render(request, 'prison_break_app/profile.html')
        

#view for signing in a user
def signin(request):
    #make sure post method so data is supplied
    if request.method == "POST":
        #get the data from the post method
        username = request.POST.get('Username')
        password = request.POST.get('Password')
        #check if data is correct
        user = authenticate(username=username, password=password)
        if user:
            if user.is_active:
                #data is correct and user is not disabled so login and redirect
                auth_login(request, user)
                return redirect(reverse('prison_break_app:index'))
            else:
                #user account is disabled so redirect to login with error message
                contextdict={}
                contextdict['Invalid'] = "Youre account has been disabled, Contact an administrator"
                return render(request, 'prison_break_app/login.html', contextdict)
            
        else:
            #data supplied is incorrect so redirect to login page wwith error message
            contextdict={}
            contextdict['Invalid'] = "Incorrect username or password given"
            return render(request, 'prison_break_app/login.html', contextdict)

    else:
        return render(request, 'prison_break_app/index.html')

#View to log the user out of their current logged in account
@login_required
def userlogout(request):
    logout(request)
    return redirect(reverse('prison_break_app:index'))

#Creates the view to process the leaderboard
def leaderboard(request):
    score_list = {}
    users = User.objects.all()

    #Loops through all users and gets their user profiles, checks their current score is not 0 (ie not played) and adds them to a 
    #hashmap/dictionary

    for theuser in users:
        name = theuser.username
        UserProfile.objects.get_or_create(user=theuser)

        
        score = theuser.userprofile.prevscore
        if score != 0:
            score_list[name] = score

    

    #Goes through every userprofile in the hashmap and creates a leaderboard object for them. If the user is on the leaderboard it updates
    #the existing leaderboard entry otherwise it saves the new leaderboard profile
    
    for key, value in score_list.items():
        leaderboard = Leaderboard()
       
        leaderboard.userp = User.objects.get(username=key)
        leaderboard.name = key
        leaderboard.lscore = value
        if Leaderboard.objects.filter(name=leaderboard.name).exists():
            Leaderboard.objects.filter(name=leaderboard.name).update(lscore=leaderboard.lscore)
        else:
            leaderboard.save()
    



    #Orders the top 10 leaderboard scores in descending order (ie higher score is better)
    leaderboards = Leaderboard.objects.all().order_by('-lscore')[:10]
    context_dict = {}

    context_dict['Leaderboard'] = leaderboards
    
    #Returns the queryset of leaderboards objects back to the page in a context_dict
    return render(request, 'prison_break_app/leaderboard.html', context=context_dict)

#Helper function to check if a username is in the database to stop duplicate key errors
def validate_username(request):
    username = request.GET.get('username', None)
    data = {'is_taken': User.objects.filter(username=username).exists()}
    return JsonResponse(data)

#View to delete a user account and will return the logged out deleted user to the homepage
def deleteacc(request): 
    try:
        u = User.objects.get(username = request.user.username)
        logout(request)
        u.delete()
        return render(request, 'prison_break_app/index.html')

    except User.DoesNotExist:  
        return render(request, 'prison_break_app/index.html')

#Creates a custom view when not in development to handle 404 page not found errors
def handler404(request, exception):
    return render(request, 'prison_break_app/404.html', status=404)




        





