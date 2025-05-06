# forms.py

from django import forms
from .models import Locataire, Appartement, Paiement, Preavis

class LocataireForm(forms.ModelForm):
    class Meta:
        model = Locataire
        fields = ['utilisateur', 'appartement', 'date_entree', 'date_sortie']

class AppartementForm(forms.ModelForm):
    class Meta:
        model = Appartement
        fields = ['numero', 'surface', 'nombre_pieces', 'loyer', 'est_occupe']

class PaiementForm(forms.ModelForm):
    class Meta:
        model = Paiement
        fields = ['locataire', 'montant', 'date_paiement']

class PreavisForm(forms.ModelForm):
    class Meta:
        model = Preavis
        fields = ['locataire', 'date_debut', 'date_fin']
