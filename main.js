// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }
});

// AI Readiness Assessment Tool
class AssessmentTool {
    constructor() {
        this.currentQuestion = 1;
        this.totalQuestions = 3;
        this.answers = {};
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
    }
    
    bindEvents() {
        // Next button
        const nextBtn = document.getElementById('next-btn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        // Previous button
        const prevBtn = document.getElementById('prev-btn');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevQuestion());
        }
        
        // Radio button changes
        document.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                this.saveAnswer(e.target.name, e.target.value);
                this.updateNextButton();
            }
        });
    }
    
    saveAnswer(question, answer) {
        this.answers[question] = answer;
    }
    
    nextQuestion() {
        if (this.currentQuestion < this.totalQuestions) {
            this.hideCurrentQuestion();
            this.currentQuestion++;
            this.showCurrentQuestion();
            this.updateProgress();
        } else {
            this.showResults();
        }
    }
    
    prevQuestion() {
        if (this.currentQuestion > 1) {
            this.hideCurrentQuestion();
            this.currentQuestion--;
            this.showCurrentQuestion();
            this.updateProgress();
        }
    }
    
    hideCurrentQuestion() {
        const current = document.querySelector(`[data-question="${this.currentQuestion}"]`);
        if (current) {
            current.classList.add('hidden');
        }
    }
    
    showCurrentQuestion() {
        const current = document.querySelector(`[data-question="${this.currentQuestion}"]`);
        if (current) {
            current.classList.remove('hidden');
        }
    }
    
    updateProgress() {
        const nextBtn = document.getElementById('next-btn');
        const prevBtn = document.getElementById('prev-btn');
        
        // Update previous button
        if (this.currentQuestion > 1) {
            prevBtn.classList.remove('hidden');
        } else {
            prevBtn.classList.add('hidden');
        }
        
        // Update next button text
        if (this.currentQuestion === this.totalQuestions) {
            nextBtn.innerHTML = 'Get Results<i class="fas fa-chart-line ml-2"></i>';
        } else {
            nextBtn.innerHTML = 'Next<i class="fas fa-arrow-right ml-2"></i>';
        }
        
        this.updateNextButton();
    }
    
    updateNextButton() {
        const nextBtn = document.getElementById('next-btn');
        const currentQuestionInputs = document.querySelectorAll(`[data-question="${this.currentQuestion}"] input[type="radio"]`);
        const hasAnswer = Array.from(currentQuestionInputs).some(input => input.checked);
        
        nextBtn.disabled = !hasAnswer;
        if (hasAnswer) {
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        } else {
            nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }
    
    calculateScore() {
        let score = 0;
        let timeMultiplier = 1;
        let savingsMultiplier = 1;
        
        // Team size scoring
        const teamSize = this.answers['team-size'];
        if (teamSize === '1-10') score += 20;
        else if (teamSize === '11-50') score += 35;
        else if (teamSize === '51-250') score += 50;
        else if (teamSize === '250+') score += 30;
        
        // Repetitive tasks scoring
        const tasks = this.answers['repetitive-tasks'];
        if (tasks === 'few') score += 15;
        else if (tasks === 'moderate') score += 30;
        else if (tasks === 'many') score += 45;
        
        // Tech integration scoring
        const tech = this.answers['tech-integration'];
        if (tech === 'basic') score += 10;
        else if (tech === 'intermediate') score += 25;
        else if (tech === 'advanced') score += 40;
        
        // Calculate multipliers for estimates
        if (teamSize === '51-250' || teamSize === '250+') {
            savingsMultiplier = 2;
            timeMultiplier = 1.5;
        }
        if (tasks === 'many') {
            savingsMultiplier *= 1.3;
            timeMultiplier *= 1.2;
        }
        
        return {
            score: Math.min(score, 95),
            savingsMultiplier,
            timeMultiplier
        };
    }
    
    showResults() {
        // Hide all questions
        document.querySelectorAll('.question-block').forEach(q => q.classList.add('hidden'));
        document.querySelector('#next-btn').style.display = 'none';
        document.querySelector('#prev-btn').style.display = 'none';
        
        // Calculate and show results
        const results = this.calculateScore();
        const resultsSection = document.getElementById('assessment-results');
        
        // Update score
        document.getElementById('automation-score').textContent = `${results.score}%`;
        
        // Update message based on score
        const messageEl = document.getElementById('automation-message');
        if (results.score >= 80) {
            messageEl.textContent = "Excellent! You're ready to automate a significant portion of your workflows!";
        } else if (results.score >= 60) {
            messageEl.textContent = "Great potential! AI automation can significantly improve your operations.";
        } else if (results.score >= 40) {
            messageEl.textContent = "Good foundation! Start with key workflow automation for immediate impact.";
        } else {
            messageEl.textContent = "Perfect starting point! Let's build your automation foundation step by step.";
        }
        
        // Update estimates
        const baseSavings = 30000;
        const baseTime = 15;
        const baseROI = 6;
        
        document.getElementById('potential-savings').textContent = 
            `$${Math.round(baseSavings * results.savingsMultiplier).toLocaleString()}/year`;
        document.getElementById('time-saved').textContent = 
            `${Math.round(baseTime * results.timeMultiplier)} hours/week`;
        document.getElementById('roi-timeline').textContent = 
            results.score >= 70 ? '3-4 months' : results.score >= 50 ? '4-6 months' : '6-8 months';
        
        // Show results with animation
        resultsSection.classList.remove('hidden');
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// AI Chatbot Demo
class ChatbotDemo {
    constructor() {
        this.responses = {
            'business': {
                keywords: ['business', 'benefit', 'help', 'do', 'automation', 'advantage'],
                response: "AI agents can transform your business by automating repetitive tasks, improving decision-making with data insights, reducing operational costs by 30-50%, and freeing your team to focus on strategic work. They work 24/7 without breaks and can handle complex workflows across departments."
            },
            'pricing': {
                keywords: ['cost', 'price', 'pricing', 'expensive', 'money', 'investment'],
                response: "Our pricing ranges from $50K-$100K for most custom implementations, which typically pays for itself within 3-6 months through efficiency gains. We offer a free assessment to determine exact costs for your needs. Unlike enterprise solutions that cost millions, we make AI accessible for growing businesses."
            },
            'implementation': {
                keywords: ['long', 'time', 'setup', 'implement', 'deploy', 'install'],
                response: "Most implementations take 4-8 weeks from start to deployment. We begin with a 1-week assessment, followed by 2-3 weeks of custom development, 1 week of integration and testing, and 1 week of team training. You'll see initial results within the first month."
            },
            'integration': {
                keywords: ['integrate', 'connect', 'systems', 'tools', 'existing', 'current'],
                response: "Yes! Our AI agents integrate seamlessly with your existing tools like CRM systems, email platforms, project management software, accounting tools, and more. We use APIs and custom connectors to ensure everything works together smoothly without disrupting your current workflows."
            },
            'support': {
                keywords: ['support', 'help', 'maintenance', 'problem', 'issue'],
                response: "We provide 24/7 technical support, performance monitoring, regular optimization updates, and a dedicated success manager. Your AI agents are continuously monitored and improved to ensure optimal performance and ROI."
            },
            'security': {
                keywords: ['secure', 'security', 'safe', 'data', 'privacy', 'protection'],
                response: "Security is our top priority. We use enterprise-grade encryption, secure cloud infrastructure, regular security audits, and compliance with industry standards like SOC 2 and GDPR. Your data never leaves your secure environment without explicit permission."
            },
            'team': {
                keywords: ['team', 'employees', 'staff', 'people', 'training'],
                response: "We provide comprehensive training for your team, ensuring smooth adoption of AI workflows. Most teams love working with AI agents because it eliminates boring, repetitive tasks and allows them to focus on more creative and strategic work."
            },
            'demo': {
                keywords: ['demo', 'see', 'show', 'example', 'try'],
                response: "I'd be happy to arrange a personalized demo! Our demos show real AI agents working with sample data from your industry. You'll see exactly how multi-agent workflows can transform your specific business processes. Would you like to schedule one?"
            }
        };
        
        this.defaultResponses = [
            "That's a great question! Our AI agents are designed to handle complex business workflows. Could you tell me more about your specific needs?",
            "I'd love to help you with that! Our custom AI solutions are tailored to each business. What industry are you in?",
            "Interesting! Let me connect you with our team for a detailed answer. In the meantime, what's your biggest automation challenge?"
        ];
        
        this.init();
    }
    
    init() {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }
    
    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Generate and add bot response after delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1500);
    }
    
    addMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageEl = document.createElement('div');
        messageEl.className = 'flex items-start space-x-3';
        
        if (sender === 'user') {
            messageEl.innerHTML = `
                <div class="flex-1"></div>
                <div class="bg-sovrana-blue text-white rounded-lg p-3 max-w-xs">
                    <p>${message}</p>
                </div>
                <div class="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-gray-600 text-sm"></i>
                </div>
            `;
        } else {
            messageEl.innerHTML = `
                <div class="w-8 h-8 bg-sovrana-blue rounded-full flex items-center justify-center">
                    <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div class="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <p class="text-gray-800">${message}</p>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    showTypingIndicator() {
        const chatMessages = document.getElementById('chat-messages');
        const typingEl = document.createElement('div');
        typingEl.className = 'flex items-start space-x-3 typing-indicator';
        typingEl.innerHTML = `
            <div class="w-8 h-8 bg-sovrana-blue rounded-full flex items-center justify-center">
                <i class="fas fa-robot text-white text-sm"></i>
            </div>
            <div class="bg-gray-100 rounded-lg p-3">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingEl);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    generateResponse(message) {
        const lowercaseMessage = message.toLowerCase();
        
        // Check each response category
        for (const [category, data] of Object.entries(this.responses)) {
            if (data.keywords.some(keyword => lowercaseMessage.includes(keyword))) {
                return data.response;
            }
        }
        
        // Return default response
        return this.defaultResponses[Math.floor(Math.random() * this.defaultResponses.length)];
    }
}

// Quick question function for chatbot
function askQuestion(question) {
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.value = question;
        chatbot.sendMessage();
    }
}

// Handle chat key press
function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message function for button
function sendMessage() {
    if (window.chatbot) {
        window.chatbot.sendMessage();
    }
}

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success message
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            submitBtn.classList.remove('bg-gradient-to-r', 'from-cyan-500', 'to-blue-500');
            submitBtn.classList.add('bg-green-500');
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.classList.add('bg-gradient-to-r', 'from-cyan-500', 'to-blue-500');
                submitBtn.classList.remove('bg-green-500');
                contactForm.reset();
            }, 3000);
            
            // In a real application, you would send this data to your server
            console.log('Form submitted:', data);
        });
    }
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.tech-hero');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Initialize interactive components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Assessment Tool
    window.assessmentTool = new AssessmentTool();
    
    // Initialize Chatbot Demo
    window.chatbot = new ChatbotDemo();
    
    // Add some initial animation delays for better visual flow
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((el, index) => {
        if (!el.hasAttribute('data-aos-delay')) {
            el.setAttribute('data-aos-delay', Math.min(index * 100, 800));
        }
    });
});

// Enhanced navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-sovrana-blue');
        link.classList.add('text-gray-600');
        
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-gray-600');
            link.classList.add('text-sovrana-blue');
        }
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Error handling for missing elements
window.addEventListener('error', function(e) {
    console.log('Error caught:', e.error);
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});
