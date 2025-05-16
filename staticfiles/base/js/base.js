document.addEventListener('DOMContentLoaded', function() {
    // Loading state management
    const body = document.body;
    const loadingTimeout = setTimeout(() => {
        body.classList.remove('loading');
    }, 5000); // Fallback timeout

    window.addEventListener('load', function() {
        clearTimeout(loadingTimeout);
        body.classList.remove('loading');
    });

    // Enhanced navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        const toggleMenu = (isOpen) => {
            if (isOpen === undefined) {
                isOpen = navMenu.classList.toggle('active');
            } else {
                navMenu.classList.toggle('active', isOpen);
            }
            
            navToggle.setAttribute('aria-expanded', isOpen);
            document.documentElement.style.overflowY = isOpen ? 'hidden' : '';
            return isOpen;
        };

        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside or pressing Escape
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                e.target !== navToggle) {
                toggleMenu(false);
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu(false);
                navToggle.focus();
            }
        });

        // Close menu on link click (mobile)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    toggleMenu(false);
                }
            });
        });
    }

    // WebSocket for unread messages
    if (window.USER_ID && parseInt(window.USER_ID) > 0) {
        let socket = null;
        let reconnectAttempts = 0;
        const maxReconnectAttempts = 5;
        const initialReconnectDelay = 1000;
        let reconnectTimer = null;

        const updateUnreadBadge = (count) => {
            const unreadBadge = document.getElementById('navbarUnread');
            const unreadDesc = document.getElementById('navbarUnreadDesc');
            
            if (unreadBadge && unreadDesc) {
                const displayCount = count > 99 ? '99+' : count;
                unreadBadge.textContent = displayCount;
                unreadBadge.style.display = count > 0 ? 'flex' : 'none';
                unreadDesc.textContent = `{% trans "Unread messages:" %} ${displayCount}`;
            }
        };

        const connectWebSocket = () => {
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
                reconnectTimer = null;
            }

            if (reconnectAttempts >= maxReconnectAttempts) {
                console.warn('Max WebSocket reconnect attempts reached');
                return;
            }

            try {
                const wsScheme = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
                socket = new WebSocket(`${wsScheme}${window.location.host}/ws/user/${window.USER_ID}/`);

                socket.onopen = () => {
                    reconnectAttempts = 0;
                    console.log('WebSocket connection established');
                };

                socket.onmessage = (e) => {
                    try {
                        const data = JSON.parse(e.data);
                        if (data.type && (data.type === 'unread_update' || data.type === 'unread_count')) {
                            updateUnreadBadge(data.count || 0);
                        }
                    } catch (error) {
                        console.error('Error processing WebSocket message:', error);
                    }
                };

                socket.onclose = (e) => {
                    console.log(`WebSocket closed (code: ${e.code}, reason: ${e.reason})`);
                    if (!e.wasClean && reconnectAttempts < maxReconnectAttempts) {
                        const delay = Math.min(initialReconnectDelay * Math.pow(2, reconnectAttempts), 30000);
                        reconnectTimer = setTimeout(connectWebSocket, delay);
                        reconnectAttempts++;
                        console.log(`Attempting reconnect in ${delay}ms (attempt ${reconnectAttempts})`);
                    }
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                };

            } catch (error) {
                console.error('WebSocket initialization error:', error);
                if (reconnectAttempts < maxReconnectAttempts) {
                    const delay = initialReconnectDelay * (reconnectAttempts + 1);
                    reconnectTimer = setTimeout(connectWebSocket, delay);
                    reconnectAttempts++;
                }
            }
        };

        // Fetch initial unread count with retry logic
        const fetchUnreadCount = (retries = 3, delay = 1000) => {
            fetch(`/conversation/api/unread-count/`)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP ${response.status}`);
                    return response.json();
                })
                .then(data => {
                    updateUnreadBadge(data.total_unread || 0);
                    connectWebSocket();
                })
                .catch(error => {
                    console.error('Error fetching unread count:', error);
                    if (retries > 0) {
                        setTimeout(() => fetchUnreadCount(retries - 1, delay * 2), delay);
                    } else {
                        updateUnreadBadge(0);
                    }
                });
        };

        fetchUnreadCount();

        // Clean up WebSocket on page unload
        window.addEventListener('beforeunload', () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
            if (reconnectTimer) {
                clearTimeout(reconnectTimer);
            }
        });
    }

    // Enhanced smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = document.querySelector('.ethio-header')?.offsetHeight || 70;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
                
                // Focus the target for keyboard users
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Add passive event listeners for better scroll performance
    try {
        const options = {
            passive: true,
            capture: true
        };
        window.addEventListener('scroll', () => {}, options);
        window.addEventListener('touchmove', () => {}, options);
    } catch (e) {
        console.log('Passive event listeners not supported');
    }
});