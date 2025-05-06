# views.py
from .forms import LocataireForm, AppartementForm, PaiementForm, PreavisForm
from django.contrib.auth.decorators import login_required
from .models import Appartement, Locataire, Paiement, Preavis
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login

def connexion(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('tableau_de_bord')  # Redirige vers la page tableau de bord après connexion
    else:
        form = AuthenticationForm()
    return render(request, 'connexion.html', {'form': form})

@login_required
def ajouter_locataire(request):
    if request.method == 'POST':
        form = LocataireForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('liste_locataires')
    else:
        form = LocataireForm()
    return render(request, 'formulaire_locataire.html', {'form': form})

@login_required
def ajouter_appartement(request):
    if request.method == 'POST':
        form = AppartementForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('liste_appartements')
    else:
        form = AppartementForm()
    return render(request, 'formulaire_appartement.html', {'form': form})

@login_required
def enregistrer_paiement(request):
    if request.method == 'POST':
        form = PaiementForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('liste_paiements')
    else:
        form = PaiementForm()
    return render(request, 'formulaire_paiement.html', {'form': form})

def page_not_found(request, exception):
    return render(request, '404.html', status=404)

@login_required
def tableau_de_bord(request):
        compteur_appartements = Appartement.objects.count()
        compteur_locataires = Locataire.objects.count()
        compteur_paiements = Paiement.objects.count()
        compteur_preavis = Preavis.objects.count()

        context = {
            'compteur_appartements': compteur_appartements,
            'compteur_locataires': compteur_locataires,
            'compteur_paiements': compteur_paiements,
            'compteur_preavis': compteur_preavis,
        }

        return render(request, 'tableau_de_bord.html', context)

@login_required
def liste_appartements(request):
    appartements = Appartement.objects.all()
    return render(request, 'liste_appartements.html', {'appartements': appartements})

@login_required
def liste_locataires(request):
    locataires = Locataire.objects.all()
    return render(request, 'liste_locataires.html', {'locataires': locataires})

@login_required
def liste_paiements(request):
    paiements = Paiement.objects.all()
    return render(request, 'liste_paiements.html', {'paiements': paiements})

@login_required
def liste_preavis(request):
    preavis = Preavis.objects.all()
    return render(request, 'liste_preavis.html', {'preavis': preavis})

@login_required
def ajouter_paiement(request, pk):
    locataire = Locataire.objects.get(pk=pk)
    if request.method == 'POST':
        form = PaiementForm(request.POST)
        if form.is_valid():
            paiement = form.save(commit=False)
            paiement.locataire = locataire
            paiement.save()
            return redirect('liste_paiements')
    else:
        form = PaiementForm()
    return render(request, 'formulaire_paiement.html', {'form': form})

@login_required
def ajouter_preavis(request, pk):
    locataire = Locataire.objects.get(pk=pk)
    if request.method == 'POST':
        form = PreavisForm(request.POST)
        if form.is_valid():
            preavis = form.save(commit=False)
            preavis.locataire = locataire
            preavis.save()
            return redirect('liste_preavis')
    else:
        form = PreavisForm()
    return render(request, 'formulaire_preavis.html', {'form': form})
