"""prison_break URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin #Test 2
from django.urls import path #Test
from prison_break_app import views
from django.urls import include
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('prisonbreak/', include('prison_break_app.urls')),
    path('', views.index, name='index'),
    path('accounts/', include('allauth.urls')),
    path('accounts/profile/', views.profile, name='social'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = views.handler404