# Étape 1 : Builder le frontend
FROM node:20 AS frontend-builder
WORKDIR /app
COPY frontend/ ./frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Étape 2 : Image finale avec Django
FROM python:3.11-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Créer le dossier de l'app
WORKDIR /app

# Copier les fichiers
#COPY --from=frontend-builder /app/staticfiles /app/static
COPY . /app

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Collecter les fichiers statiques
#RUN python manage.py collectstatic --noinput

# Exposer le port
EXPOSE 8000

# Lancer l'application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "projectCafeeSEP.wsgi:application"]
