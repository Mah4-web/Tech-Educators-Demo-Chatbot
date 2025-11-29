const chatIcon = document.querySelector('.chat-icon');
const chatContainer = document.querySelector('.chat-container');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input');
const chatSend = document.querySelector('.chat-send');

// Toggle chat visibility
chatIcon.addEventListener('click', () => {
    const isHidden = chatContainer.hasAttribute('hidden');
    if (isHidden) {
    chatContainer.removeAttribute('hidden');
    chatInput.focus();
    if (chatMessages.children.length === 0) {
            appendMessage("Bot: Hi! Welcome to Tech Educators Bot.", 'bot-message');
        }
    } else {
    chatContainer.setAttribute('hidden', '');
    }
});

// Accessibility toggle with keyboard on icon (Enter/Space)
chatIcon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    chatIcon.click();
    }
});

// Append message helper
function appendMessage(text, className) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = text;
    msgDiv.className = className;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hardcoded bot responses
function getBotResponse(input) {
    input = input.toLowerCase();

    if (["course", "courses", "offer", "training"].some(word => input.includes(word))) {
    return "We offer Software Development, Digital Innovator, Digital Marketing with AI, AI Literacy, and Leadership & Digital Transformation. Check our Courses page for details.";
    } else if (input.includes("start") || input.includes("date")) {
    return "Start dates vary by course. Please visit the course page or contact us to find the next available date.";
    } else if (input.includes("apply") || input.includes("join")) {
    return "You can apply by clicking 'Apply Now' on the course page that interests you.";
    } else if (input.includes("about") || input.includes("what is")) {
    return "Tech Educators helps people from all backgrounds learn practical tech skills and prepare for careers in software development, digital marketing, AI, and more.";
    } else if (input.includes("funding") || input.includes("free")) {
    return "We offer funded and subsidised bootcamps. Visit our Funding page for eligibility details.";
    } else if (input.includes("contact")) {
    return "You can reach us via the Contact page on our website. We’d love to hear from you!";
    } else if (input.includes("duration") || input.includes("long")) {
    return "Most bootcamps run for 12 to 16 weeks, depending on the course.";
    } else if (input.includes("location") || input.includes("where")) {
    return "Our courses are delivered online, so you can join from anywhere!";
    } else if (input.includes("jobs") || input.includes("career")) {
    return "We provide career support, interview prep, and networking opportunities to help you land your first tech role.";
    } else {
    return "Sorry, I do not have that info yet — try asking about courses, start dates, funding, or how to apply.";
    }
}

// Send message handler
function sendMessage() {
    const userText = chatInput.value.trim();
    if (userText === "") return;

    appendMessage(userText, 'user-message');
    chatInput.value = '';

    setTimeout(() => {
    const botReply = getBotResponse(userText);
    appendMessage(botReply, 'bot-message');
    }, 500);
}

// Handle send button click
chatSend.addEventListener('click', sendMessage);

// Handle enter key press in input
chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
    e.preventDefault();
    sendMessage();
    }
});
