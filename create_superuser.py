from users.models import CustomUser
CustomUser.objects.create_superuser(
    username="fraol", 
    phone_number="0975060586"
)