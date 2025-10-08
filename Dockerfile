# Base image
FROM python:3.12-slim  

# User no root
RUN useradd -m django_user

# Working directory
WORKDIR /app

# copy requirements file to aprove caching
COPY requirements.txt .

# install necessary system dependencies and utilities to wait for DB
RUN apt-get update && apt-get install -y \
    netcat-traditional gcc libpq-dev && \
    pip install --no-cache-dir -r requirements.txt && \
    apt-get remove -y gcc && apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# Copy project files
COPY . .

# Change user to non-root
USER django_user

# django port
EXPOSE 8000

# Default command
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
