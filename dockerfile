# Use an official Python runtime as the base image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8000  # Railway will override this, but set a default

# Install system dependencies (required for psycopg2, Daphne, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    python3-dev \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy and install Python dependencies first (for caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project
COPY . .

# Collect static files & run migrations (same as your `release` phase in Procfile)
RUN python manage.py collectstatic --noinput
RUN python manage.py migrate --noinput

# Expose the default Railway port
EXPOSE $PORT

# Run both Gunicorn (WSGI) and Daphne (ASGI) via a start script
CMD ["sh", "-c", "gunicorn project.wsgi:application --workers 2 --bind 0.0.0.0:$PORT --timeout 180 & daphne project.asgi:application --port $((PORT + 1)) --bind 0.0.0.0"]