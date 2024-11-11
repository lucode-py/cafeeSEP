# main/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),  # L'URL de la page d'accueil
    path('edit/', views.edit, name='edit'),  # URL pour la page d'édition
]