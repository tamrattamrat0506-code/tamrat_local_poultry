# filepath: c:\Users\Na\Desktop\firaol\project\contact\templatetags\contact_extras.py
from django import template

register = template.Library()

@register.filter(name='add_class')
def add_class(field, css_class):
    return field.as_widget(attrs={"class": css_class})