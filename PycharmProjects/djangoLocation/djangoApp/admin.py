from django.contrib import admin
from .models import Locataire, Appartement, Paiement, Preavis

@admin.register(Appartement)
class AppartementAdmin(admin.ModelAdmin):
    list_display = ['numero', 'surface', 'nombre_pieces', 'loyer', 'date_ajout','est_occupe']

@admin.register(Locataire)
class LocataireAdmin(admin.ModelAdmin):
    list_display = ['utilisateur', 'appartement', 'date_entree', 'date_sortie']

@admin.register(Paiement)
class PaiementAdmin(admin.ModelAdmin):
    list_display = ['locataire', 'montant', 'date_paiement']

class PreavisAdmin(admin.ModelAdmin):
    list_display = ('date_debut', 'date_fin', 'raison')  # Assurez-vous que ces champs existent dans le modèle

admin.site.register(Preavis, PreavisAdmin)