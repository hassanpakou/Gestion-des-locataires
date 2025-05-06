# projet/celery.py

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Définit les paramètres du projet Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'projet.settings')

# Crée une instance de Celery
app = Celery('projet')

# Charge la configuration à partir des paramètres Django
app.config_from_object('django.conf:settings', namespace='CELERY')

# Découvre automatiquement les tâches dans les applications installées
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
