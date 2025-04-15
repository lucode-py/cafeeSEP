# main/urls.py

from django.urls import path, re_path
from .views import upload_report, delete_report, edit, update_texte, update_rendezvous, update_activite, add_activite, delete_activite, home, api_textes, api_activities, update_report, list_reports
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
    path('upload_report/', upload_report, name='upload_report'),
    re_path(r'^delete_report/(?P<file_name>.+)/$', delete_report, name='delete_report'),
    path('update_report/<int:report_id>/', update_report, name='update_report'),
    path('api/list_reports/', list_reports, name='list_reports'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # ✅ Sert les fichiers médias en mode debug