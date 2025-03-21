# main/urls.py

from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', home, name='home'),  # L'URL de la page d'accueil
    path('edit/', edit, name='edit'),  # URL pour la page d'édition
    path('update/<int:texte_id>/', update_texte, name='update_texte'),  # Mise à jour des textes
    path('update-rendezvous/', update_rendezvous, name='update_rendezvous'),
    path("update-activite/<int:activite_id>/", update_activite, name="update_activite"),
    path('add_activite/', add_activite, name='add_activite'),
    path('delete_activite/<int:activite_id>/', delete_activite, name='delete_activite'),
    path("api/textes/", api_textes),
    path("api/activites/", api_activities),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # ✅ Sert les fichiers médias en mode debug