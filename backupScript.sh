#!/bin/bash

read -p "Entrez votre nom : " containerName
echo "Bonjour, $containerName !"
podman cp $containerName:/app/db.sqlite3 ./db_backup.sqlite3
podman cp $containerName:/app/media ./media_backup
podman cp $containerName:/app/static ./static_backup
