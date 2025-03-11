# main/views.py
from .models import TexteHome
from .models import Activite

from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from .forms import TexteHomeForm 
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse


@login_required
def edit(request):
    textes = TexteHome.objects.all()
    activites = Activite.objects.all()
    print("Activités récupérées :", activites)  # ✅ Vérifie si Django récupère bien les activités
    return render(request, 'edit.html', {'textes': textes, 'activites': activites})


def home(request):
    textes = TexteHome.objects.all()  # Récupère tous les textes de la base de données
    activiter = Activite.objects.all()
    return render(request, 'home.html', {'textes': textes, 'activite': Activite})


def update_texte(request, texte_id):
    texte = get_object_or_404(TexteHome, id=texte_id)
    if request.method == "POST":
        texte.section = request.POST.get('titre', texte.section)
        texte.contenu = request.POST.get('contenu', texte.contenu)
        if 'image' in request.FILES:
            texte.image = request.FILES['image']
        texte.save()
        return redirect('edit')  # Remplace 'edit' par le nom de ton URL pour la redirection
    return render(request, 'update_texte.html', {'texte': texte})

def update_rendezvous(request):
    if request.method == "POST":
        # Supprimer toutes les anciennes entrées de la section "Rendez-vous"
        TexteHome.objects.filter(section="Rendez-vous").delete()
        
        # Ajouter les nouvelles dates
        dates = request.POST.getlist('dates[]')
        for date in dates:
            if date.strip():  # Ignorer les champs vides
                TexteHome.objects.create(section="Rendez-vous", contenu=date.strip())
        
        return redirect('edit')  # Redirige vers la page d'édition
    
    # Si GET, renvoyer à la page d'édition (ou autre page par défaut)
    return redirect('edit')


@login_required
def update_activite(request, activite_id):
    activite = get_object_or_404(Activite, id=activite_id)

    if request.method == "POST":
        activite.titre = request.POST.get("titre", activite.titre)
        activite.description = request.POST.get("description", activite.description)
        
        # Gérer la date
        date_str = request.POST.get("date")
        if date_str:
            activite.date = date_str  # Django convertit automatiquement en `datetime.date`

        # Gérer l'image
        if "image" in request.FILES:
            activite.image = request.FILES["image"]

        activite.save()
        return redirect("edit")  # Redirection vers la page d'édition après sauvegarde

    return render(request, "edit.html", {"activite": activite})
@csrf_exempt
def add_activite(request):
    if request.method == "POST":
        titre = request.POST.get("titre")
        description = request.POST.get("description")
        date = request.POST.get("date")
        image = request.FILES.get("image", None)

        Activite.objects.create(titre=titre, description=description, image=image, date=date)
        return redirect('edit')

    return render(request, 'edit.html')

@csrf_exempt
def delete_activite(request, activite_id):
    activite = get_object_or_404(Activite, id=activite_id)
    activite.delete()
    return redirect('edit')

def api_textes(request):
    textes = list(TexteHome.objects.values())  # Convertir en liste de dictionnaires
    return JsonResponse(textes, safe=False)

def api_activities(request):
    activities = Activite.objects.all()
    data = [
        {
            "id": activity.id,
            "titre": activity.titre,
            "description": activity.description,
            "date": activity.date.strftime("%Y-%m-%d"),  # Format de date standard
            "image": request.build_absolute_uri(activity.image.url) if activity.image else None,
        }
        for activity in activities
    ]
    return JsonResponse(data, safe=False)