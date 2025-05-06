# urls.py

from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('', views.connexion, name='connexion'),  # Page de connexion comme page d'accueil
    path('deconnexion/', auth_views.LogoutView.as_view(next_page='connexion'), name='deconnexion'),
    path('tableau_de_bord/', views.tableau_de_bord, name='tableau_de_bord'),
    path('appartements/', views.liste_appartements, name='liste_appartements'),
    path('appartements/ajouter/', views.ajouter_appartement, name='ajouter_appartement'),
    path('locataires/', views.liste_locataires, name='liste_locataires'),
    path('locataires/ajouter/', views.ajouter_locataire, name='ajouter_locataire'),
    path('paiements/', views.liste_paiements, name='liste_paiements'),
    path('paiements/enregistrer/', views.enregistrer_paiement, name='enregistrer_paiement'),
    path('preavis/', views.liste_preavis, name='liste_preavis'),
    path('paiement/<int:pk>/ajouter/', views.ajouter_paiement, name='ajouter_paiement'),
    path('preavis/<int:pk>/ajouter/', views.ajouter_preavis, name='ajouter_preavis'),
    path('password_reset/', auth_views.PasswordResetView.as_view(), name='password_reset'),
    path('password_reset/done/', auth_views.PasswordResetDoneView.as_view(), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', auth_views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('reset/done/', auth_views.PasswordResetCompleteView.as_view(), name='password_reset_complete'),
    path('404/', views.page_not_found, name='page_not_found'),

]

handler404 = 'djangoApp.views.page_not_found'
