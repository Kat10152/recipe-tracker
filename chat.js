const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

// Conversation history sent to the server for context
const history = [];

chatToggle.addEventListener('click', () => {
  const isOpen = !chatPanel.hidden;
  chatPanel.hidden = isOpen;
  chatToggle.setAttribute('aria-expanded', String(!isOpen));
  if (!isOpen) chatInput.focus();
});

chatClose.addEventListener('click', () => {
  chatPanel.hidden = true;
  chatToggle.setAttribute('aria-expanded', 'false');
});

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

function appendMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = `chat-message chat-message--${role}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

function showTypingIndicator() {
  const indicator = document.createElement('div');
  indicator.className = 'chat-message chat-message--assistant chat-message--typing';
  indicator.id = 'chat-typing';
  indicator.innerHTML = '<span></span><span></span><span></span>';
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  document.getElementById('chat-typing')?.remove();
}

function setLoading(loading) {
  chatSend.disabled = loading;
  chatInput.disabled = loading;
  chatSend.textContent = loading ? '...' : 'Send';
}

async function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  appendMessage('user', text);
  setLoading(true);
  showTypingIndicator();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history })
    });

    const data = await res.json();

    if (!res.ok) {
      appendMessage('error', data.error || 'Something went wrong. Please try again.');
      return;
    }

    const reply = data.reply;
    appendMessage('assistant', reply);

    // Keep last 10 exchanges (20 messages) for context
    history.push({ role: 'user', content: text });
    history.push({ role: 'assistant', content: reply });
    if (history.length > 20) history.splice(0, 2);
  } catch {
    appendMessage('error', 'Could not reach the server. Make sure it is running (`npm start`).');
  } finally {
    removeTypingIndicator();
    setLoading(false);
    if (!chatPanel.hidden) chatInput.focus();
  }
}
