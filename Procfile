web: gunicorn project.wsgi:application
worker: daphne project.asgi:application --port $PORT --bind 0.0.0.0