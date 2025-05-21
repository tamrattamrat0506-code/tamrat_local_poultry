web: gunicorn project.wsgi:application --workers 2 --bind 0.0.0.0:$PORT --timeout 180

release: python manage.py collectstatic --noinput