# models.py

from django.db import models
from django.contrib.auth.models import User

class Appartement(models.Model):
    numero = models.CharField(max_length=10)
    surface = models.DecimalField(max_digits=5, decimal_places=2)
    nombre_pieces = models.IntegerField()
    loyer = models.DecimalField(max_digits=8, decimal_places=2)
    date_ajout = models.DateField(auto_now_add=True)  # Non éditable
    est_occupe = models.BooleanField(default=False)
class Locataire(models.Model):
    utilisateur = models.CharField(max_length=10)
    appartement = models.ForeignKey(Appartement, on_delete=models.CASCADE)
    date_entree = models.DateField()
    date_sortie = models.DateField(null=True, blank=True)

class Paiement(models.Model):
    locataire = models.ForeignKey(Locataire, on_delete=models.CASCADE)
    montant = models.DecimalField(max_digits=8, decimal_places=2)
    date_paiement = models.DateField()
class Preavis(models.Model):
    date_debut = models.DateField()
    date_fin = models.DateField()
    raison = models.CharField(max_length=255)
    locataire = models.ForeignKey(Locataire, on_delete=models.CASCADE)

    def __str__(self):
        return f"Preavis {self.date_debut} - {self.date_fin}"