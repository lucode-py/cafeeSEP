from django.contrib import admin
from django.contrib import admin
from .models import TexteHome, Activite


# Register your models here.                       
admin.site.register(TexteHome)
admin.site.register(Activite)  # ✅ Ajoute cette ligne si elle manque