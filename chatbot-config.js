/**
 * Mahadev Electricals - AI Chatbot Configuration
 * Powered by Tawk.to (Free AI Chatbot)
 */

// Tawk.to Configuration
// Sign up at https://www.tawk.to/ to get your property ID and widget ID
var Tawk_API = Tawk_API || {};
var Tawk_LoadStart = new Date();

// Quick Response Templates
const quickResponses = {
    products: "We offer electrical supplies, PVC pipes, tiles, sanitary wares, doors, and paints. Which category interests you?",
    hours: "We're open Monday-Saturday: 9:00 AM - 8:00 PM, Sunday: 9:00 AM - 2:00 PM",
    location: "Visit us at 373, Trichy Rd, Agraharam, Singanallur, Tamil Nadu 641016",
    contact: "Call us at 9363387963 or WhatsApp at the same number. For tiles, call 8122066565",
    brands: "We're authorized dealers for V-Guard, Havells, Fybros, Kundan, Lisha, GM, and Legrand",
    delivery: "Yes, we provide delivery throughout Coimbatore. Contact us for details!",
    genuine: "All our products are 100% genuine with manufacturer warranty. We're authorized dealers!",
    price: "We offer the best competitive prices. Visit our store or call for specific product quotes!"
};

// Initialize Tawk.to Chatbot
function initTawkTo() {
    (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        // REPLACE WITH YOUR TAWK.TO PROPERTY ID AND WIDGET ID
        s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
    })();
}

// Alternative: Custom Simple Chatbot (No signup required)
function initCustomChatbot() {
    const chatbotHTML = `
        <div id="custom-chatbot" class="custom-chatbot">
            <div id="chat-toggle" class="chat-toggle">
                <i class="fas fa-comments"></i>
                <span class="chat-badge">1</span>
            </div>
            
            <div id="chat-window" class="chat-window">
                <div class="chat-header">
                    <div class="chat-header-content">
                        <div class="chat-avatar">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div>
                            <h4>Mahadev Electricals</h4>
                            <p class="online-status">
                                <span class="status-dot"></span> Online Now
                            </p>
                        </div>
                    </div>
                    <button id="chat-close" class="chat-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <div class="bot-message">
                        <div class="message-content">
                            <p>👋 Welcome to Mahadev Electricals!</p>
                            <p>How can we help you today?</p>
                        </div>
                    </div>
                </div>
                
                <div class="quick-options" id="quick-options">
                    <button class="quick-btn" data-response="products">
                        <i class="fas fa-box"></i> Our Products
                    </button>
                    <button class="quick-btn" data-response="hours">
                        <i class="fas fa-clock"></i> Store Hours
                    </button>
                    <button class="quick-btn" data-response="location">
                        <i class="fas fa-map-marker-alt"></i> Location
                    </button>
                    <button class="quick-btn" data-response="contact">
                        <i class="fas fa-phone"></i> Contact Us
                    </button>
                    <button class="quick-btn" data-response="brands">
                        <i class="fas fa-certificate"></i> Brands
                    </button>
                    <button class="quick-btn" data-response="delivery">
                        <i class="fas fa-truck"></i> Delivery
                    </button>
                </div>
                
                <div class="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Type your message...">
                    <button id="chat-send" class="chat-send-btn">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="chat-actions">
                    <a href="tel:9363387963" class="action-btn">
                        <i class="fas fa-phone"></i> Call Now
                    </a>
                    <a href="https://wa.me/919363387963" class="action-btn">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    initChatbotEvents();
}

function initChatbotEvents() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const quickBtns = document.querySelectorAll('.quick-btn');
    const chatBadge = document.querySelector('.chat-badge');
    
    // Toggle chat
    chatToggle.addEventListener('click', () => {
        chatWindow.classList.toggle('open');
        if (chatBadge) chatBadge.style.display = 'none';
    });
    
    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('open');
    });
    
    // Quick responses
    quickBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const response = btn.dataset.response;
            addMessage(btn.textContent.trim(), 'user');
            setTimeout(() => {
                addMessage(quickResponses[response], 'bot');
            }, 500);
        });
    });
    
    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simple AI response
            setTimeout(() => {
                const response = getAIResponse(message);
                addMessage(response, 'bot');
            }, 800);
        }
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function addMessage(text, type) {
    const messagesDiv = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getAIResponse(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('product') || msg.includes('what do you sell')) {
        return quickResponses.products;
    } else if (msg.includes('hours') || msg.includes('timing') || msg.includes('open')) {
        return quickResponses.hours;
    } else if (msg.includes('location') || msg.includes('address') || msg.includes('where')) {
        return quickResponses.location;
    } else if (msg.includes('contact') || msg.includes('phone') || msg.includes('call')) {
        return quickResponses.contact;
    } else if (msg.includes('brand') || msg.includes('v-guard') || msg.includes('havells')) {
        return quickResponses.brands;
    } else if (msg.includes('delivery') || msg.includes('shipping')) {
        return quickResponses.delivery;
    } else if (msg.includes('genuine') || msg.includes('authentic') || msg.includes('original')) {
        return quickResponses.genuine;
    } else if (msg.includes('price') || msg.includes('cost') || msg.includes('rate')) {
        return quickResponses.price;
    } else {
        return "Thank you for your message! For specific inquiries, please call us at 9363387963 or use our contact form. Our team will be happy to assist you!";
    }
}

// Initialize chatbot when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCustomChatbot);
} else {
    initCustomChatbot();
}