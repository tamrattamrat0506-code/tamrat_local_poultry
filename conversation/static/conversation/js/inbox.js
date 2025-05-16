// JavaScript for conversation inbox page
document.addEventListener('DOMContentLoaded', function() {
  // Add click event to conversation items
  const conversationItems = document.querySelectorAll('.conversation-item');
  conversationItems.forEach(item => {
      item.addEventListener('click', function() {
          window.location.href = this.querySelector('a').href;
      });
  });
  
  // Mark conversations as read when page loads
  markConversationsAsRead();
});

function markConversationsAsRead() {
  // You can implement AJAX call here to mark conversations as read
  console.log('Marking conversations as read...');
}

// static/conversation/js/inbox.js
document.addEventListener('DOMContentLoaded', function() {
  {% if user.is_authenticated %}
  const userId = {{ user.id }};
  const notificationSocket = new WebSocket(
      `ws://${window.location.host}/ws/user/${userId}/`
  );

  notificationSocket.onmessage = function(e) {
      const data = JSON.parse(e.data);
      if (data.type === 'unread_update') {
          const badge = document.getElementById(`unread-${data.conversation_id}`);
          if (badge) {
              if (data.count > 0) {
                  badge.textContent = data.count;
                  badge.style.display = 'inline-flex';
              } else {
                  badge.style.display = 'none';
                  badge.closest('.conversation-card').classList.remove('unread');
              }
          }
      }
  };
  {% endif %}
});