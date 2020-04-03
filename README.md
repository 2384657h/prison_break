 **Built with:**
 

 - Django 2.1.5
 - Django-allauth
 - Bootstrap 4
 - JQuery

 **Installation Instructions**
 
1.) Clone the repo
```
git clone https://github.com/2384657h/prison_break.git
```
2.) Create a Python virtual environment (optional) with Python 3.7
3.) Installed the required packages
```
pip install -r requirements.txt
```
4.) Migrate the database
```
cd prison_break
python manage.py makemigrations
python manage.py migrate
```
5.) Run the population script called population_script.py
```
python population_script.py
```
6.) Now we can run the tests using the test file to make sure everything works as intended
```
python manage.py test prison_break_app.tests
```
7.) Finally, the server can now be ran from the terminal using the following command. It will be hosted at 127.0.0.1:8000 by default
```
python manage.py runserver
```

**Optional (Enabling google login)**

1.) Create a database superuser using
```
python manage.py createsuperuser
```
2.) Login to the admin page by navigating to 127.0.0.1:8000/admin and login

3.) Click on sites, There should be one by deafult called example.com and if not just add one.

4.) Change the domain name to 127.0.0.1:8000 and set the display name to whatever you like and save

5.) Go back to the admin home page

6.) At the bottom click on social applications and the click on add social application in the top right

7.) Set the provider to be google. Then name it anything (I reccomend google api)

8.) Then input the client id and secret key (For our tutor these are located in the project summary sheet on moodle)

9.) Click on the site we added earlier and move it across into the "Chosen sites" box.

10.) Save and return home.

Google login should now be working properly.


