/**
 * ============================================================================
 * ASHISH KAUSHIK - PERSONAL PORTFOLIO INTERACTION ENGINE
 * Particle Canvas, Dynamic Typewriter, Interactive AI Chatbot, & C Simulator
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initTypewriter();
  initNavbarScrollSpy();
  initMobileMenu();
  initTerminalRunner();
  initCModal();
  initAIChatbot();
  initContactForm();
  initCopyActions();
});

/* ==========================================================================
   1. PARTICLE CONSTELLATION BACKGROUND CANVAS
   ========================================================================== */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 18000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      else if (this.x > width) this.x = 0;

      if (this.y < 0) this.y = height;
      else if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 242, 254, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      // Mouse interactive connection
      if (mouse.x !== null) {
        const dx = particles[i].x - mouse.x;
        const dy = particles[i].y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.25 * (1 - dist / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = [
    'B.Tech Student @ JECRC University',
    'C Programming Specialist',
    'Software Enthusiast from Rewari, Haryana',
    'CBSE 2024 Graduate',
    'Creator of AI Chatbot & Web Apps'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbarScrollSpy() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Navbar glass blur background on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let currentId = '';
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE TERMINAL & C SIMULATOR
   ========================================================================== */
function initTerminalRunner() {
  const runBtn = document.getElementById('run-c-profile');
  const consoleOutput = document.getElementById('console-output');
  const heroRunBtn = document.getElementById('hero-run-code');

  function simulateExecution() {
    if (!consoleOutput) return;

    consoleOutput.innerHTML = `
      <span class="console-line text-cyan">&gt; Compiling with gcc 13.2.0 (O2 optimization)...</span>
      <span class="console-line text-white">&gt; Executing ./ashish_profile...</span>
    `;

    setTimeout(() => {
      consoleOutput.innerHTML = `
        <span class="console-line text-cyan">&gt; [GCC 13.2.0]: Compilation successful (0 errors, 0 warnings).</span>
        <span class="console-line text-cyan">&gt; ============================================</span>
        <span class="console-line text-white">&gt; Welcome to Ashish Kaushik's Portfolio!</span>
        <span class="console-line text-white">&gt; Location: Rewari, Haryana, India</span>
        <span class="console-line text-white">&gt; Education: B.Tech @ JECRC University</span>
        <span class="console-line text-white">&gt; CBSE 12th: Passed in 2024</span>
        <span class="console-line text-white">&gt; Primary Stack: C Language &amp; Systems Logic</span>
        <span class="console-line text-white">&gt; Contact: +91 8708121274</span>
        <span class="console-line text-green">&gt; Status: Ready to engineer the future. [Exit code: 0]</span>
      `;
      showToast('C program compiled and executed successfully!', 'success');
    }, 700);
  }

  if (runBtn) {
    runBtn.addEventListener('click', simulateExecution);
  }

  if (heroRunBtn) {
    heroRunBtn.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(simulateExecution, 600);
      }
    });
  }
}

/* ==========================================================================
   6. C CODE MODAL (DSA & Systems Suite)
   ========================================================================== */
function initCModal() {
  const modalOverlay = document.getElementById('c-modal-overlay');
  const openBtns = document.querySelectorAll('.open-c-modal');
  const closeBtn = document.getElementById('close-c-modal');
  const copyBtn = document.getElementById('copy-c-code-btn');
  const runBtn = document.getElementById('modal-run-c-btn');

  if (!modalOverlay) return;

  openBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      modalOverlay.classList.remove('hidden');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalOverlay.classList.add('hidden');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add('hidden');
    }
  });

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const code = document.querySelector('#c-modal-overlay code');
      if (code) {
        navigator.clipboard.writeText(code.innerText).then(() => {
          showToast('C Source Code copied to clipboard!', 'info');
        });
      }
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      showToast('Simulating: Linked List node allocation & memory freeing... [OK]', 'success');
    });
  }
}

/* ==========================================================================
   7. INTERACTIVE AI CHATBOT ENGINE (Ashish AI)
   ========================================================================== */
function initAIChatbot() {
  const triggerBtn = document.getElementById('chatbot-trigger-btn');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('bot-close-btn');
  const clearBtn = document.getElementById('bot-clear-btn');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const chips = document.querySelectorAll('.chip-btn');
  const navTrigger = document.getElementById('chatbot-toggle-nav');
  const projectTriggers = document.querySelectorAll('.launch-chatbot-trigger');

  function openChatbot() {
    panel.classList.remove('hidden');
    triggerBtn.classList.add('active');
    input.focus();
  }

  function closeChatbot() {
    panel.classList.add('hidden');
    triggerBtn.classList.remove('active');
  }

  function toggleChatbot() {
    if (panel.classList.contains('hidden')) {
      openChatbot();
    } else {
      closeChatbot();
    }
  }

  if (triggerBtn) triggerBtn.addEventListener('click', toggleChatbot);
  if (closeBtn) closeBtn.addEventListener('click', closeChatbot);
  if (navTrigger) navTrigger.addEventListener('click', openChatbot);

  projectTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      openChatbot();
      addBotMessage(
        "🚀 You triggered the **Personal AI Chatbot** demo! Ask me any question about Ashish Kaushik, his C programming background, JECRC University, CBSE 2024 completion, or his contact info (+91 8708121274)!"
      );
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      messagesContainer.innerHTML = `
        <div class="chat-msg bot-msg">
          <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
          <div class="msg-bubble">
            <p>Chat cleared! How can I assist you regarding <strong>Ashish Kaushik</strong>?</p>
            <span class="msg-timestamp">Just now</span>
          </div>
        </div>
      `;
    });
  }

  // Suggestion chips
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      if (query) {
        handleUserMessage(query);
      }
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      handleUserMessage(text);
      input.value = '';
    });
  }

  function handleUserMessage(userText) {
    // Add user bubble
    addUserMessage(userText);

    // Show simulated typing indicator
    const typingId = showTypingIndicator();

    // Generate intelligent contextual response
    setTimeout(() => {
      removeTypingIndicator(typingId);
      const botResponse = generateAIResponse(userText);
      addBotMessage(botResponse);
    }, 650);
  }

  function addUserMessage(text) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-user"></i></div>
      <div class="msg-bubble">
        <p>${escapeHTML(text)}</p>
        <span class="msg-timestamp">${timeStr}</span>
      </div>
    `;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot-msg';
    msgDiv.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble">
        <p>${formatBotResponse(text)}</p>
        <span class="msg-timestamp">${timeStr}</span>
      </div>
    `;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = 'chat-msg bot-msg';
    div.innerHTML = `
      <div class="msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="msg-bubble" style="font-style: italic; color: #94a3b8;">
        <span>Thinking &amp; compiling response...</span>
      </div>
    `;
    messagesContainer.appendChild(div);
    scrollToBottom();
    return id;
  }

  function removeTypingIndicator(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Response generation logic
  function generateAIResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('who') || q.includes('about') || q.includes('ashish') || q.includes('intro')) {
      return "Ashish Kaushik is an ambitious engineering student from **Rewari, Haryana**. He completed his 12th in **2024 from CBSE Board** and is currently pursuing **B.Tech at JECRC University**. His primary technical focus is **C programming**, data structures, algorithms, and interactive software systems.";
    }

    if (q.includes('education') || q.includes('college') || q.includes('school') || q.includes('12th') || q.includes('btech') || q.includes('jecrc') || q.includes('cbse')) {
      return "Here is Ashish's academic trajectory:\n\n1. **B.Tech (Bachelor of Technology)**: Currently pursuing at **JECRC University**.\n2. **Class 12th (Senior Secondary)**: Successfully completed in **2024** under the **CBSE Board** from Rewari, Haryana.";
    }

    if (q.includes('skill') || q.includes('c language') || q.includes('coding') || q.includes('stack') || q.includes('programming')) {
      return "Ashish's core strength is **C Language Programming** (Pointers, Memory Allocation with malloc/free, Structs, File I/O, Linked Lists, and DSA). In addition, he possesses competencies in problem solving, algorithms, Web technologies (HTML5, Modern CSS, JavaScript), and Git/GitHub.";
    }

    if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('chatbot')) {
      return "Ashish has developed key projects including:\n\n1. **Personal AI Chatbot**: An intelligent conversational interface built with responsive logic and interactive user dialog (which you are using right now!).\n2. **Personal Portfolio Website**: A futuristic, responsive dark-mode portfolio featuring modern glassmorphism, C compiler simulation, and real-time interactions.\n3. **C Systems & DSA Suite**: Clean, memory-safe implementations of dynamic data structures.";
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('call') || q.includes('mobile')) {
      return "You can reach Ashish Kaushik directly at:\n\n📞 **Phone / Call**: [8708121274](tel:8708121274)\n💬 **WhatsApp**: [Click to chat on WhatsApp](https://wa.me/918708121274)\n📍 **Location**: Rewari, Haryana, India";
    }

    if (q.includes('github') || q.includes('git')) {
      return "Ashish's GitHub repository link is available here: [Ashish Kaushik on GitHub](https://github.com/). Feel free to explore his open-source work and code repositories!";
    }

    if (q.includes('linkedin')) {
      return "You can connect with Ashish professionally on LinkedIn: [Ashish Kaushik LinkedIn Profile](https://www.linkedin.com/in/ashish-kaushik-304109430?utm_source=share_via&utm_content=profile&utm_medium=member_android).";
    }

    if (q.includes('rewari') || q.includes('haryana') || q.includes('location') || q.includes('where')) {
      return "Ashish Kaushik is from **Rewari, Haryana, India**. He completed his 12th standard (CBSE 2024) there before commencing his B.Tech at JECRC University!";
    }

    if (q.includes('certification') || q.includes('achievement')) {
      return "Ashish's notable achievements include:\n- **CBSE Class 12th Board Certificate (2024)**\n- **C Language Programming & Problem Solving Foundation**\n- **JECRC University Engineering Academic Progression**\n- **Interactive AI Chatbot & Portfolio Deployment**";
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return "Hello there! Glad to connect. Feel free to ask about Ashish's B.Tech education at JECRC University, his C programming projects, or get his contact number: **8708121274**.";
    }

    // Default Fallback
    return "Thank you for asking! Ashish Kaushik is a B.Tech student at JECRC University (CBSE 2024 passout from Rewari, Haryana) specializing in C programming and AI Chatbots. You can also reach him directly at **8708121274** or on [LinkedIn](https://www.linkedin.com/in/ashish-kaushik-304109430).";
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatBotResponse(text) {
    // Markdown-like bold & linebreaks
    let formatted = escapeHTML(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    // Parse links safely
    formatted = formatted.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #00f2fe; text-decoration: underline;">$1</a>'
    );
    return formatted;
  }
}

/* ==========================================================================
   8. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const phone = document.getElementById('sender-phone').value.trim();
    const subject = document.getElementById('sender-subject').value.trim();
    const message = document.getElementById('sender-message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all required fields.', 'info');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Transmit Message';

      if (feedback) {
        feedback.classList.remove('hidden');
        feedback.innerHTML = `
          <div class="feedback-icon"><i class="fa-solid fa-circle-check"></i></div>
          <div class="feedback-text">
            <h4>Thank you, ${escapeSpecialChars(name)}!</h4>
            <p>Your message has been composed. You can also send this instantly via WhatsApp or direct email:</p>
            <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <a href="https://wa.me/918708121274?text=${encodeURIComponent(
                `Hi Ashish, I am ${name} (${email}). ${message}`
              )}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary">
                <i class="fa-brands fa-whatsapp"></i> Send via WhatsApp
              </a>
              <a href="mailto:ashishkaushik@example.com?subject=${encodeURIComponent(
                subject || 'Portfolio Inquiry'
              )}&body=${encodeURIComponent(`From: ${name} (${phone})\n\n${message}`)}" class="btn btn-sm btn-outline-cyan">
                <i class="fa-solid fa-envelope"></i> Open in Email
              </a>
            </div>
          </div>
        `;
      }

      showToast(`Thank you, ${name}! Inquiry initiated for Ashish Kaushik.`, 'success');
      form.reset();
    }, 800);
  });
}

function escapeSpecialChars(str) {
  return str.replace(/[&<>'"]/g, (tag) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

/* ==========================================================================
   9. QUICK ACTIONS & CLIPBOARD UTILITIES
   ========================================================================== */
function initCopyActions() {
  const copyPhoneBtn = document.getElementById('copy-phone-btn');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('8708121274').then(() => {
        showToast('Phone number copied: 8708121274', 'success');
      });
    });
  }
}

/* ==========================================================================
   10. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-info';

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
