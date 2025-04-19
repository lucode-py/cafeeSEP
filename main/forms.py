from django import forms
from .models import TexteHome

class TexteHomeForm(forms.ModelForm):
    class Meta:
        model = TexteHome
        fields = ['section', 'contenu', 'image']
