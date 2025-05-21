# project/asgi.py
import os
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")

# ✅ Call this before any Django model import (directly or indirectly)
django_asgi_app = get_asgi_application()

# ✅ Only now, after apps are ready, import your routing modules
import users.routing
import conversation.routing

# Combine all websocket routes
all_ws_patterns = (
    users.routing.websocket_urlpatterns +
    conversation.routing.websocket_urlpatterns
)

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(all_ws_patterns)
    ),
})
