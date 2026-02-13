/**
 * Mahadev Electricals - AI Chatbot Configuration
 * Powered by Tawk.to (Free Live Chat Platform)
 * 
 * Features:
 * - Real-time live chat support
 * - AI-powered automated responses
 * - Mobile responsive
 * - Custom styling to match brand
 * - Fallback custom chatbot if Tawk.to is not configured
 */

// ===== CONFIGURATION =====
const CHATBOT_CONFIG = {
  // Tawk.to Integration (Sign up at https://www.tawk.to/)
  tawkPropertyId: '698f09b41f51081c3676f3af', // Add your Tawk.to Property ID here
  tawkWidgetId: '1jhbbrqu4',   // Add your Tawk.to Widget ID here
  useTawkTo: false,   // Set to true when you have Tawk.to credentials
  
  // Business Information
  businessName: 'Mahadev Electricals',
  businessPhone: '9363387963',
  businessWhatsApp: '919363387963',
  businessEmail: 'rohithofficial99@gmail.com',
  businessAddress: '373, Trichy Rd, Agraharam, Singanallur, Tamil Nadu 641016',
  
  // Chatbot Settings
  welcomeMessage: '👋 Welcome to Mahadev Electricals! How can we help you today?',
  offlineMessage: 'We\'re currently offline. Please leave a message or call us at 9363387963.',
  businessHours: 'Monday-Saturday: 9:00 AM - 8:00 PM, Sunday: 9:00 AM - 2:00 PM',
};

// ===== QUICK RESPONSE TEMPLATES =====
const quickResponses = {
  products: {
    text: "We offer a wide range of products:\n\n📦 Electrical Supplies\n🔧 PVC Pipes & Fittings\n🏠 Tiles & Sanitary Wares\n🚪 Doors & Windows\n🎨 Paints & Hardware\n\nWhich category interests you?",
    icon: "fas fa-box"
  },
  hours: {
    text: `Our Store Hours:\n\n🕒 Monday-Saturday: 9:00 AM - 8:00 PM\n🕒 Sunday: 9:00 AM - 2:00 PM\n\nVisit us anytime during these hours!`,
    icon: "fas fa-clock"
  },
  location: {
    text: `📍 Visit Our Store:\n\n${CHATBOT_CONFIG.businessAddress}\n\nClick below for directions! 👇`,
    icon: "fas fa-map-marker-alt",
    action: {
      text: "Get Directions",
      url: "https://maps.app.goo.gl/57RnqHsiYMi67jmb8"
    }
  },
  contact: {
    text: `📞 Contact Us:\n\nOffice: ${CHATBOT_CONFIG.businessPhone}\nTiles: 8122066565\nWhatsApp: ${CHATBOT_CONFIG.businessPhone}\n\nWe're here to help! 😊`,
    icon: "fas fa-phone"
  },
  brands: {
    text: "✅ Authorized Dealer For:\n\n⚡ V-Guard\n💡 Havells\n🔌 Fybros\n🏠 Kundan\n✨ Lisha\n⚙️ GM Modular\n🎯 Legrand\n\nAll products come with manufacturer warranty!",
    icon: "fas fa-certificate"
  },
  delivery: {
    text: "🚚 Delivery Service Available!\n\nWe provide fast delivery throughout Coimbatore and nearby areas.\n\nContact us for:\n• Delivery charges\n• Time estimates\n• Bulk orders\n\nCall: " + CHATBOT_CONFIG.businessPhone,
    icon: "fas fa-truck"
  },
  genuine: {
    text: "✅ 100% Genuine Products Guarantee!\n\n• Authorized dealer for all brands\n• Manufacturer warranty included\n• Quality certified products\n• No duplicate/fake items\n\nYour trust is our priority! 🛡️",
    icon: "fas fa-shield-alt"
  },
  price: {
    text: "💰 Best Competitive Prices!\n\n• Wholesale rates available\n• Bulk order discounts\n• Contractor special pricing\n• Price matching for genuine products\n\nCall for specific quotes: " + CHATBOT_CONFIG.businessPhone,
    icon: "fas fa-tag"
  },
  services: {
    text: "🛠️ Our Services:\n\n• Product consultation\n• Technical guidance\n• Bulk supply for projects\n• After-sales support\n• Installation advice\n\nLet us know how we can help!",
    icon: "fas fa-tools"
  }
};

// ===== INITIALIZE CHATBOT =====
function initChatbot() {
  if (CHATBOT_CONFIG.useTawkTo && CHATBOT_CONFIG.tawkPropertyId && CHATBOT_CONFIG.tawkWidgetId) {
    initTawkTo();
  } else {
    initCustomChatbot();
  }
}

// ===== TAWK.TO INTEGRATION =====
function initTawkTo() {
  var Tawk_API = Tawk_API || {};
  var Tawk_LoadStart = new Date();
  
  (function(){
    var s1 = document.createElement("script");
    var s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = `https://embed.tawk.to/698f09b41f51081c3676f3af/1jhbbrqu4`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  })();
  
  // Customize Tawk.to widget
  Tawk_API.onLoad = function(){
    Tawk_API.setAttributes({
      'name': CHATBOT_CONFIG.businessName,
      'email': CHATBOT_CONFIG.businessEmail
    }, function(error){});
  };
}

// ===== CUSTOM CHATBOT (FALLBACK) =====
function initCustomChatbot() {
  // Add chatbot styles
  addChatbotStyles();
  
  // Add chatbot HTML
  const chatbotHTML = `
    <div id="custom-chatbot" class="custom-chatbot">
      <!-- Chat Toggle Button -->
      <div id="chat-toggle" class="chat-toggle" aria-label="Open chat">
        <i class="fas fa-comments"></i>
        <span class="chat-badge">1</span>
      </div>
      
      <!-- Chat Window -->
      <div id="chat-window" class="chat-window">
        <!-- Header -->
        <div class="chat-header">
          <div class="chat-header-content">
            <div class="chat-avatar">
              <i class="fas fa-bolt"></i>
            </div>
            <div class="chat-header-info">
              <h4>${CHATBOT_CONFIG.businessName}</h4>
              <p class="online-status">
                <span class="status-dot"></span> Online Now
              </p>
            </div>
          </div>
          <button id="chat-close" class="chat-close" aria-label="Close chat">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <!-- Messages Area -->
        <div class="chat-messages" id="chat-messages">
          <div class="bot-message">
            <div class="bot-avatar">
              <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">
              <p>${CHATBOT_CONFIG.welcomeMessage}</p>
            </div>
          </div>
        </div>
        
        <!-- Quick Options -->
        <div class="quick-options" id="quick-options">
          <button class="quick-btn" data-response="products">
            <i class="fas fa-box"></i>
            <span>Products</span>
          </button>
          <button class="quick-btn" data-response="hours">
            <i class="fas fa-clock"></i>
            <span>Hours</span>
          </button>
          <button class="quick-btn" data-response="location">
            <i class="fas fa-map-marker-alt"></i>
            <span>Location</span>
          </button>
          <button class="quick-btn" data-response="contact">
            <i class="fas fa-phone"></i>
            <span>Contact</span>
          </button>
          <button class="quick-btn" data-response="brands">
            <i class="fas fa-certificate"></i>
            <span>Brands</span>
          </button>
          <button class="quick-btn" data-response="delivery">
            <i class="fas fa-truck"></i>
            <span>Delivery</span>
          </button>
        </div>
        
        <!-- Input Area -->
        <div class="chat-input-area">
          <input 
            type="text" 
            id="chat-input" 
            placeholder="Type your message..." 
            autocomplete="off"
            aria-label="Type your message"
          >
          <button id="chat-send" class="chat-send-btn" aria-label="Send message">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
        
        <!-- Action Buttons -->
        <div class="chat-actions">
          <a href="tel:${CHATBOT_CONFIG.businessPhone}" class="action-btn call-btn">
            <i class="fas fa-phone"></i>
            <span>Call Now</span>
          </a>
          <a href="https://wa.me/${CHATBOT_CONFIG.businessWhatsApp}" class="action-btn whatsapp-btn" target="_blank">
            <i class="fab fa-whatsapp"></i>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  initChatbotEvents();
}

// ===== CHATBOT STYLES =====
function addChatbotStyles() {
  const styles = `
    <style>
      /* Chat Toggle Button */
      .custom-chatbot {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
      }
      
      .chat-toggle {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #0EA5E9, #FF6B35);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
        transition: all 0.3s ease;
        position: relative;
      }
      
      .chat-toggle:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 30px rgba(14, 165, 233, 0.6);
      }
      
      .chat-toggle i {
        color: white;
        font-size: 28px;
      }
      
      .chat-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background: #FF6B35;
        color: white;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        border: 2px solid white;
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
      
      /* Chat Window */
      .chat-window {
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 380px;
        max-width: calc(100vw - 40px);
        height: 600px;
        max-height: calc(100vh - 140px);
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(20px) scale(0.95);
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .chat-window.open {
        opacity: 1;
        transform: translateY(0) scale(1);
        visibility: visible;
      }
      
      /* Header */
      .chat-header {
        background: linear-gradient(135deg, #0EA5E9, #FF6B35);
        padding: 20px;
        border-radius: 20px 20px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .chat-header-content {
        display: flex;
        align-items: center;
        gap: 12px;
      }
      
      .chat-avatar {
        width: 45px;
        height: 45px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
      }
      
      .chat-header-info h4 {
        margin: 0;
        color: white;
        font-size: 16px;
        font-weight: bold;
      }
      
      .online-status {
        margin: 2px 0 0 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;
        gap: 5px;
      }
      
      .status-dot {
        width: 8px;
        height: 8px;
        background: #10B981;
        border-radius: 50%;
        animation: blink 2s infinite;
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .chat-close {
        background: transparent;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
      }
      
      .chat-close:hover {
        transform: rotate(90deg);
      }
      
      /* Messages Area */
      .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background: #F9FAFB;
      }
      
      .chat-messages::-webkit-scrollbar {
        width: 6px;
      }
      
      .chat-messages::-webkit-scrollbar-thumb {
        background: #0EA5E9;
        border-radius: 3px;
      }
      
      .bot-message,
      .user-message {
        display: flex;
        gap: 10px;
        margin-bottom: 16px;
        animation: slideIn 0.3s ease;
      }
      
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .bot-avatar {
        width: 35px;
        height: 35px;
        background: linear-gradient(135deg, #0EA5E9, #0284C7);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
        flex-shrink: 0;
      }
      
      .user-message {
        justify-content: flex-end;
      }
      
      .message-content {
        background: white;
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 75%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      }
      
      .user-message .message-content {
        background: linear-gradient(135deg, #0EA5E9, #0284C7);
        color: white;
      }
      
      .message-content p {
        margin: 0;
        font-size: 14px;
        line-height: 1.5;
        white-space: pre-wrap;
      }
      
      .message-action {
        margin-top: 10px;
      }
      
      .message-action a {
        display: inline-block;
        background: #0EA5E9;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        text-decoration: none;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s;
      }
      
      .message-action a:hover {
        background: #0284C7;
        transform: translateY(-2px);
      }
      
      /* Quick Options */
      .quick-options {
        padding: 15px;
        background: white;
        border-top: 1px solid #E5E7EB;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        overflow-x: auto;
      }
      
      .quick-btn {
        background: #F3F4F6;
        border: 1px solid #E5E7EB;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        transition: all 0.2s;
        font-size: 12px;
        color: #374151;
      }
      
      .quick-btn:hover {
        background: #0EA5E9;
        color: white;
        border-color: #0EA5E9;
        transform: translateY(-2px);
      }
      
      .quick-btn i {
        font-size: 16px;
      }
      
      /* Input Area */
      .chat-input-area {
        display: flex;
        gap: 10px;
        padding: 15px;
        background: white;
        border-top: 1px solid #E5E7EB;
      }
      
      #chat-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #E5E7EB;
        border-radius: 25px;
        font-size: 14px;
        outline: none;
        transition: all 0.2s;
      }
      
      #chat-input:focus {
        border-color: #0EA5E9;
        box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
      }
      
      .chat-send-btn {
        width: 45px;
        height: 45px;
        background: linear-gradient(135deg, #0EA5E9, #0284C7);
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }
      
      .chat-send-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
      }
      
      /* Action Buttons */
      .chat-actions {
        display: flex;
        gap: 10px;
        padding: 15px;
        background: white;
        border-top: 1px solid #E5E7EB;
        border-radius: 0 0 20px 20px;
      }
      
      .action-btn {
        flex: 1;
        padding: 12px;
        border-radius: 25px;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
      }
      
      .call-btn {
        background: linear-gradient(135deg, #0EA5E9, #0284C7);
        color: white;
      }
      
      .call-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(14, 165, 233, 0.4);
      }
      
      .whatsapp-btn {
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
      }
      
      .whatsapp-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
      }
      
      /* Mobile Responsive */
      @media (max-width: 768px) {
        .custom-chatbot {
          bottom: 80px;
          right: 15px;
        }
        
        .chat-toggle {
          width: 55px;
          height: 55px;
        }
        
        .chat-toggle i {
          font-size: 24px;
        }
        
        .chat-window {
          bottom: 150px;
          right: 15px;
          width: calc(100vw - 30px);
          height: calc(100vh - 200px);
        }
        
        .quick-options {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
  `;
  
  document.head.insertAdjacentHTML('beforeend', styles);
}

// ===== EVENT HANDLERS =====
function initChatbotEvents() {
  const chatToggle = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const chatClose = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const quickBtns = document.querySelectorAll('.quick-btn');
  const chatBadge = document.querySelector('.chat-badge');
  
  // Toggle chat window
  chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('open');
    if (chatBadge && chatWindow.classList.contains('open')) {
      chatBadge.style.display = 'none';
    }
  });
  
  // Close chat window
  chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('open');
  });
  
  // Handle quick response buttons
  quickBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const responseKey = btn.dataset.response;
      const buttonText = btn.querySelector('span').textContent;
      
      addMessage(buttonText, 'user');
      
      setTimeout(() => {
        const response = quickResponses[responseKey];
        addMessage(response.text, 'bot', response.action);
      }, 600);
    });
  });
  
  // Send message function
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addMessage(message, 'user');
      chatInput.value = '';
      
      setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, 'bot');
      }, 800);
    }
  }
  
  // Send button click
  chatSend.addEventListener('click', sendMessage);
  
  // Enter key to send
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// ===== ADD MESSAGE TO CHAT =====
function addMessage(text, type, action = null) {
  const messagesDiv = document.getElementById('chat-messages');
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
  
  let messageHTML = '';
  if (type === 'bot') {
    messageHTML = `
      <div class="bot-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <p>${text}</p>
        ${action ? `<div class="message-action"><a href="${action.url}" target="_blank">${action.text}</a></div>` : ''}
      </div>
    `;
  } else {
    messageHTML = `
      <div class="message-content">
        <p>${text}</p>
      </div>
    `;
  }
  
  messageDiv.innerHTML = messageHTML;
  messagesDiv.appendChild(messageDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ===== AI RESPONSE LOGIC =====
function getAIResponse(message) {
  const msg = message.toLowerCase();
  
  // Keyword matching for responses
  const responses = {
    products: ['product', 'sell', 'available', 'stock', 'item', 'supplies'],
    hours: ['hours', 'timing', 'open', 'close', 'time', 'when'],
    location: ['location', 'address', 'where', 'direction', 'map', 'store'],
    contact: ['contact', 'phone', 'call', 'number', 'reach'],
    brands: ['brand', 'v-guard', 'havells', 'fybros', 'legrand', 'authorized'],
    delivery: ['delivery', 'shipping', 'transport', 'deliver'],
    genuine: ['genuine', 'authentic', 'original', 'fake', 'duplicate', 'real'],
    price: ['price', 'cost', 'rate', 'quote', 'charges', 'expensive', 'cheap'],
    services: ['service', 'installation', 'consultation', 'help', 'support']
  };
  
  // Check for keyword matches
  for (const [key, keywords] of Object.entries(responses)) {
    if (keywords.some(keyword => msg.includes(keyword))) {
      return quickResponses[key].text;
    }
  }
  
  // Default response
  return `Thank you for your message! 😊\n\nFor specific inquiries, please:\n\n📞 Call: ${CHATBOT_CONFIG.businessPhone}\n💬 WhatsApp: ${CHATBOT_CONFIG.businessPhone}\n✉️ Use our contact form\n\nOur team will be happy to assist you!`;
}

// ===== INITIALIZE ON PAGE LOAD =====
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot);
} else {
  initChatbot();
}
