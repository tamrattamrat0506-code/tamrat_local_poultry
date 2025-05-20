web: gunicorn project.wsgi:application --workers 2 --bind 0.0.0.0:$PORT --timeout 180
worker: daphne project.asgi:application --port $((PORT + 1)) --bind 0.0.0.0
release: python manage.py collectstatic --noinput