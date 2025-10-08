# API Django con Docker y PostgreSQL

## Descripción
Este proyecto contiene una API desarrollada con Django (Biblioteca) y una base de datos PostgreSQL
El despliegue se realiza mediante Docker y Docker Compose.

## Requisitos previos
- Tener instalado Docker y Docker Compose
- Clonar este repositorio y situarse en la rama `hw-06`

## Archivos principales
- `Dockerfile`: Define la imagen del proyecto Django (sin usuario root, ligera)
- `docker-compose.yml`: Orquesta la aplicación y la base de datos PostgreSQL
- `.env`: Contiene las credenciales de conexión a la base de datos

## Ejecución

### Construir e iniciar los servicios
```bash
docker-compose up --build
```

### Acceder a la aplicación
Abrir el navegador en:
http://localhost:8000

### Detener los servicios
```bash
docker-compose down
```