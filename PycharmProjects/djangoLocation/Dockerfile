# Utiliser une image Python de base
FROM python:3.9-slim

# Installer les dépendances système requises pour MariaDB/MySQL
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    pkg-config \
    mariadb-client \
    libmariadb-dev-compat \
    gcc \
    libmariadb-dev

# Mettre à jour pip
RUN python -m pip install --upgrade pip

# Copier requirements.txt et installer les dépendances Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du projet dans le conteneur
COPY . .

# Commande par défaut
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
