# Use an official Python image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies (required for psycopg2, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Make sure manage.py is executable
RUN chmod +x manage.py

# Run collectstatic and migrate
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate --noinput

# Expose the port Railway will use
EXPOSE $PORT

# Run Gunicorn (adjust as per your Procfile)
CMD ["gunicorn", "project.wsgi:application", "--bind", "0.0.0.0:$PORT"]