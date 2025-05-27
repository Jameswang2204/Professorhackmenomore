
// script.js
// Function to send user message to backend and get ChatGPT response
async function sendToChatGPT(message) {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error connecting to backend:', error);
    return 'Sorry, I could not reach the server.';
  }
}

// Sanitize input to prevent XSS
function sanitize(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Handle sending user messages
document.getElementById('sendBtn').addEventListener('click', async () => {
  const inputEl = document.getElementById('userInput');
  const message = inputEl.value.trim();
  if (!message) return;

  const chatWindow = document.getElementById('chatWindow');
  // Display user message
  const userMsg = document.createElement('div');
  userMsg.className = 'text-right mb-2';
  userMsg.innerHTML = `<span class="inline-block bg-green-200 p-2 rounded">${sanitize(message)}</span>`;
  chatWindow.appendChild(userMsg);

  inputEl.value = '';

  // Call backend for real ChatGPT response
  const response = await sendToChatGPT(message);

  // Display bot response
  const botMsg = document.createElement('div');
  botMsg.className = 'text-left mb-2';
  botMsg.innerHTML = `<span class="inline-block bg-blue-200 p-2 rounded">${sanitize(response)}</span>`;
  chatWindow.appendChild(botMsg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
});
