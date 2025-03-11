from django.db import models

# Create your models here.
from django.db import models

class TexteHome(models.Model):
    section = models.CharField(max_length=100)  # nom des section
    contenu = models.TextField()  # Contenu plus long
    image = models.ImageField(upload_to='home_images/', null=True, blank=True)  # Optionnel : une image associée
    date_modification = models.DateTimeField(auto_now=True)  # Automatiquement mis à jour

    def __str__(self):
        return self.section



class Activite(models.Model):
    titre = models.CharField(max_length=100)  # Titre de l'activité
    description = models.TextField()  # Description de l'activité
    date = models.DateField(null=True, blank=True)  # Date de l'activité (facultatif)
    image = models.ImageField(upload_to='activites_images/', null=True, blank=True)  # Image associée (facultatif)
    

    def __str__(self):
        return self.titre
