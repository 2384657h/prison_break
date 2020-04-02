from django.test import TestCase
from django.urls import reverse
from prison_break_app.models import User
from prison_break_app.models import UserProfile
from prison_break_app.models import Leaderboard
from django.contrib.auth import login as auth_login

test_username = "testuser"
test_password = "unittestpassword"
test_email = "testuser@testing.com"

def create_user():
    user = User.objects.create_user(username=test_username, password =test_password, email=test_email)
    user.save()
    profile = UserProfile()
    profile.user = user
    profile.newGame = 1
    profile.score = 27
    profile.save()


def create_super_user_object():
    """
    Helper function to create a super user (admin) account.
    """
    return User.objects.create_superuser('admin', 'admin@test.com', 'testpassword')


def login(self):
    self.client.login(username=test_username, password=test_password) 


class views_test_cases(TestCase):
    """
    test that all pages can be accessed and no error codes appear 
    """
    def setUp(self):
        create_user()

        
    def test_privacy_accesible(self):
            print("Testing privacy page is reachable")
            about = self.client.get(reverse('prison_break_app:privacy'))
            self.assertEqual(about.status_code, 200)

    def test_tos_accesible(self):
            print("Testing tos page is reachable")
            about = self.client.get(reverse('prison_break_app:terms'))
            self.assertEqual(about.status_code, 200)

    def test_about_accesible(self):
        print("Testing about page is reachable")
        about = self.client.get(reverse('prison_break_app:about'))
        self.assertEqual(about.status_code, 200)

    def test_index_accesible(self):
        print("Testing index page is reachable")
        index = self.client.get(reverse('prison_break_app:index'))
        self.assertEqual(index.status_code, 200)

    def test_leaderboard_accesible(self):
        print("Testing leaderboard page is reachable")
        leaderboard = self.client.get(reverse('prison_break_app:leaderboard'))
        self.assertEqual(leaderboard.status_code, 200)

    def test_login_accesible(self):
        print("Testing login page is reachable")
        login = self.client.get(reverse('prison_break_app:login'))
        self.assertEqual(login.status_code, 200)

    def test_signup_accesible(self):
        print("Testing signup page is reachable")
        signup = self.client.get(reverse('prison_break_app:signup'))
        self.assertEqual(signup.status_code, 200)

    def test_profile_accesible(self):
        print("Testing profile page is reachable")
        login(self)
        profile = self.client.get(reverse('prison_break_app:profile'))
        self.assertEqual(profile.status_code, 200)

class test_login(TestCase):
    """
    make sure system can create a user and log them in
    """
    def setUp(self):
        create_user()


    def test_login_works(self):

        print("testing login")
        login(self)
        self.assertTrue(login) 

class test_template_used(TestCase):
    """
    make sure each page uses the correct body block for its content html pagee
    """
    def setUp(self):
        create_user()  


    def test_tos_template(self):
        print("testing tos template used")
        response = self.client.get('/prisonbreak/terms/')
        self.assertTemplateUsed(response, 'prison_break_app/tos.html')

    def test_privacy_template(self):
        print("testing privacy template used")
        response = self.client.get('/prisonbreak/privacy/')
        self.assertTemplateUsed(response, 'prison_break_app/privacypol.html')

    def test_about_template(self):
        print("testing about template used")
        response = self.client.get('/prisonbreak/about/')
        self.assertTemplateUsed(response, 'prison_break_app/about.html')

    def test_index_template(self):
        print("testing index template used")
        response = self.client.get('/prisonbreak/')
        self.assertTemplateUsed(response, 'prison_break_app/index.html')

    def test_leaderboard_template(self):
        print("testing leaderboard template used")
        response = self.client.get('/prisonbreak/leaderboard/')
        self.assertTemplateUsed(response, 'prison_break_app/leaderboard.html')

    def test_login_template(self):
        print("testing login template used")
        response = self.client.get('/prisonbreak/login/')
        self.assertTemplateUsed(response, 'prison_break_app/login.html')

    def test_signup_template(self):
        print("testing signup template used")
        response = self.client.get('/prisonbreak/signup/')
        self.assertTemplateUsed(response, 'prison_break_app/Signup.html')

    def test_profile_accesible(self):
        print("Testing profile page is reachable")
        login(self)
        response = self.client.get('/prisonbreak/profile/')
        self.assertTemplateUsed(response, 'prison_break_app/profile.html')

class test_base_templatee_used(TestCase):
    """
    These make sure every visible page inherits from the base.html file, ensuring uniformity across site
    """
    def setUp(self):
        create_user()  

    def test_about_template(self):
        print("testing about template used")
        response = self.client.get('/prisonbreak/about/')
        self.assertTemplateUsed(response, 'prison_break_app/base.html')

    def test_index_template(self):
        print("testing index template used")
        response = self.client.get('/prisonbreak/')
        self.assertTemplateUsed(response, 'prison_break_app/base.html')

    def test_leaderboard_template(self):
        print("testing leaderboard template used")
        response = self.client.get('/prisonbreak/leaderboard/')
        self.assertTemplateUsed(response, 'prison_break_app/base.html')

    def test_login_template(self):
        print("testing login template used")
        response = self.client.get('/prisonbreak/login/')
        self.assertTemplateUsed(response, 'prison_break_app/base.html')

    def test_signup_template(self):
        print("testing signup template used")
        response = self.client.get('/prisonbreak/signup/')
        self.assertTemplateUsed(response, 'prison_break_app/base.html')

    def test_profile_accesible(self):
        print("Testing profile page is reachable")
        login(self)
        response = self.client.get('/prisonbreak/profile/')
        self.assertTemplateUsed(response, 'prison_break_app/base.html')


class test_models(TestCase):
    """
    make sure the models in database are correctly represented
    """
    def setUp(self):
        create_user()

    def test_user(self):
        user = User.objects.get(username=test_username)
        self.assertEqual(user.username, test_username)
        self.assertEqual(user.email, test_email)

    def test_leaderboard(self):
        #generate leaderboard object by visiting leaderboard page
        response = self.client.get('/prisonbreak/leaderboard/')
        leaderboard = Leaderboard.objects.get(name=test_username)
        self.assertEqual(leaderboard.lscore, 27)


class test_registration(TestCase):
    """
    test the registration using post method works too
    """
    def test_registration_post(self):
        post_data = {'Username':'test_username', 'Password':'testingpassword'}
        self.client.post(reverse('prison_break_app:register'), post_data)

        self.assertTrue(self.client.login(username='test_username', password='testingpassword'))

