(function () {
  const vscode = acquireVsCodeApi();
  const messagesEl = document.getElementById('messages');
  const form = document.getElementById('composer');
  const input = document.getElementById('input');

  let currentAssistantBubble = null;

  function addMessage(role, text) {
    const el = document.createElement('div');
    el.className = `message ${role}`;
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) {
      return;
    }
    addMessage('user', text);
    input.value = '';
    currentAssistantBubble = addMessage('assistant', '');
    vscode.postMessage({ type: 'sendMessage', text });
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  window.addEventListener('message', (event) => {
    const message = event.data;
    if (message.type === 'assistantChunk') {
      if (!currentAssistantBubble) {
        currentAssistantBubble = addMessage('assistant', '');
      }
      currentAssistantBubble.textContent += message.text;
      messagesEl.scrollTop = messagesEl.scrollHeight;
    } else if (message.type === 'assistantDone') {
      currentAssistantBubble = null;
    } else if (message.type === 'error') {
      addMessage('error', message.message);
      currentAssistantBubble = null;
    }
  });
})();
