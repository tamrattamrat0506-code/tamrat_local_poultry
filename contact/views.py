# contact\views.py
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm

from .models import Contact



from django.shortcuts import render, redirect, get_object_or_404

from django.core.paginator import Paginator
from django.contrib.auth.decorators import login_required, user_passes_test



def contact_us(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, _("Your message has been sent successfully!"))
            return redirect('contact:contact_us')
    else:
        form = ContactForm()
    return render(request, 'contact/contact_us.html', {'form': form})

def received_messages(request):
    messages_list = Contact.objects.all().order_by('-created_at')
    
    # Pagination
    paginator = Paginator(messages_list, 10)  # Show 10 messages per page
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    
    return render(request, 'contact/received_messages.html', {
        'messages_list': page_obj,
        'is_paginated': paginator.num_pages > 1
    })

def view_message(request, message_id):
    message = get_object_or_404(Contact, id=message_id)
    return render(request, 'contact/view_message.html', {'message': message})

def delete_message(request, message_id):
    message = get_object_or_404(Contact, id=message_id)
    message.delete()
    messages.success(request, _("Message deleted successfully."))
    return redirect('contact:received_messages')