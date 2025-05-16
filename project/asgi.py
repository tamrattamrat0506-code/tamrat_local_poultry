import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

# Import your routing after Django setup
from conversation import routing as conversation_routing
from users import routing as users_routing

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            conversation_routing.websocket_urlpatterns +
            users_routing.websocket_urlpatterns
        )
    ),
})