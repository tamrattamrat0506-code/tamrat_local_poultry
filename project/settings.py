# project\settings.py
import os
from pathlib import Path
from django.utils.translation import gettext_lazy as _
BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-^h2wta5iiio$am%fpi*b$2_9^u4*7w_so1d)tzs!6n#lp0m9+='
DEBUG = True
ALLOWED_HOSTS = ['*']
LANGUAGES = [
    ('en', _('English')),
    ('am', _('Amharic')),
    ('om', _('Oromiffa')),
]
LOCALE_PATHS = [
    os.path.join(BASE_DIR, 'locale'),
]
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:8000",
    'https://*.railway.app',
    'https://poultryweb-production.up.railway.app'
]
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions', 
    'django.contrib.messages',
    'channels',
    'daphne',
    'django.contrib.staticfiles',
    
    'base',
    'items',
    'conversation',
    'users',
    'rest_framework',
    'contact',
    'corsheaders',
]
ASGI_APPLICATION = 'project.asgi.application'
AUTH_USER_MODEL = 'users.CustomUser'
AUTHENTICATION_BACKENDS = ['users.backends.UsernamePhoneBackend']
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'home'

           # for production
 CHANNEL_LAYERS = {
     "default": {
         "BACKEND": "channels_redis.core.RedisChannelLayer",
         "CONFIG": {
             "hosts": [os.environ.get('REDIS_URL', 'redis://localhost:6379')],
         },
     },
 }

           # for development
#CHANNEL_LAYERS = {
#    "default": {
#        "BACKEND": "channels.layers.InMemoryChannelLayer"
#    }
#}


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware', 
    'django.middleware.common.CommonMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'project.urls'

                # for production
# SESSION_COOKIE_DOMAIN = '.railway.app'
# CSRF_COOKIE_DOMAIN = '.railway.app'
                 # for development
 SESSION_COOKIE_DOMAIN = None
 CSRF_COOKIE_DOMAIN    = None


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.i18n',
            ],
        },
    },
]
WSGI_APPLICATION = 'project.wsgi.application'
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
INSTALLED_APPS += [
    'cloudinary',
    'cloudinary_storage',
]
                   # for production
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUDINARY_CLOUD_NAME', 'doixo5oiw'),
    'API_KEY': os.getenv('CLOUDINARY_API_KEY', '435759228322341'),
    'API_SECRET': os.getenv('CLOUDINARY_API_SECRET', 'H3_ZVEXWGcyuE28IfKWUYsTo5sY'),
}
                   # for development
#CLOUDINARY = {
#    "cloud_name": "doixo5oiw",
#    "api_key": "435759228322341",
#    "api_secret": "H3_ZVEXWGcyuE28IfKWUYsTo5sY",
#}



DATA_UPLOAD_MAX_MEMORY_SIZE = 15485760
FILE_UPLOAD_MAX_MEMORY_SIZE = 15485760
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'
AUTH_PASSWORD_VALIDATORS = []
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Africa/Addis_Ababa'
USE_I18N = True
USE_TZ = True
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
