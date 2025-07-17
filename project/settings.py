# project/settings.py
import os
from pathlib import Path
from django.utils.translation import gettext_lazy as _
import cloudinary
import cloudinary.uploader
import cloudinary.api
# database
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

# Security - development settings
SECRET_KEY = 'your-development-secret-key'  # For development only - change in production
DEBUG = True  # Enabled for development
ALLOWED_HOSTS = ['*' 'localhost', '127.0.0.1','render-x1cx.onrender.com']

# Internationalization
LANGUAGES = [
    ('en', _('English')),
    ('am', _('Amharic')),
    ('om', _('Oromiffa')),
]
LOCALE_PATHS = [os.path.join(BASE_DIR, 'locale')]
LANGUAGE_COOKIE_NAME = 'django_language'
LANGUAGE_COOKIE_HTTPONLY = False
LANGUAGE_COOKIE_SAMESITE = 'Lax'

REDIS_URL = 'redis://localhost:6379'

# Security settings - relaxed for development
CSRF_TRUSTED_ORIGINS = ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://render-x1cx.onrender.com']
SESSION_COOKIE_SECURE = False  # Disabled for development
CSRF_COOKIE_SECURE = False  # Disabled for development
SECURE_PROXY_SSL_HEADER = None  # Disabled for development

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'daphne',# 1
    'django.contrib.staticfiles',# 2
    
    # Third-party apps
    'channels',
    'rest_framework',
    'corsheaders',
    'cloudinary',
    'cloudinary_storage',
    
    # Local apps
    'base',
    'poultryitems',
    'conversation',
    'users',
    'contact',
    'companies',
    'vehicles',
    'clothings',

    # aditional
    'crispy_forms',
    'crispy_bootstrap5',
]

CRISPY_ALLOWED_TEMPLATE_PACKS = "bootstrap5" 
CRISPY_TEMPLATE_PACK = "bootstrap5" 

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # 1
    'django.contrib.sessions.middleware.SessionMiddleware', # 1
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.locale.LocaleMiddleware', # 2
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'
ASGI_APPLICATION = 'project.asgi.application'
WSGI_APPLICATION = 'project.wsgi.application'
DAPHNE_TIMEOUT = 50

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres_xf9a',
        'USER': 'postgres_xf9a_user',
        'PASSWORD': 'AWs5EvfJmzQCtblnzyGFTiBIeYEQQ0LW',
        'HOST': 'dpg-d1fhd4hr0fns73cf3n90-a.oregon-postgres.render.com',
        'PORT': '5432',
        'OPTIONS': {'sslmode': 'require'},
    }
}

# Channels configuration
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [REDIS_URL],
        },
    },
}

# Authentication
AUTH_USER_MODEL = 'users.CustomUser'
AUTHENTICATION_BACKENDS = ['users.backends.UsernamePhoneBackend']
LOGIN_URL = 'login'
LOGIN_REDIRECT_URL = 'dashboard'
LOGOUT_REDIRECT_URL = 'home'

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfile')
STATICFILES_DIRS = [ BASE_DIR / "static",]  
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files - local storage for development
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Internationalization
LANGUAGE_CODE = 'en'
TIME_ZONE = 'Africa/Addis_Ababa'
USE_I18N = True
USE_TZ = True

# Security
CORS_ALLOW_ALL_ORIGINS = True  # Allowed for development

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

WHITENOISE_AUTOREFRESH = True


# Cloudinary configuration
cloudinary.config(
    cloud_name="doixo5oiw",
    api_key="435759228322341",
    api_secret="H3_ZVEXWGcyuE28IfKWUYsTo5sY",
    secure=True
)