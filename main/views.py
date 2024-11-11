# main/views.py

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

def home(request):
    return render(request, 'home.html')  # Afficher un template appelé home.html


@login_required
def edit(request):
    return render(request, 'edit.html')  # Afficher un template appelé edit.html