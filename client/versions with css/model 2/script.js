const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const closeButton = document.getElementById('closeButton');
const timerOverlay = document.getElementById('timerOverlay');
const timerDisplay = document.getElementById('timerDisplay');
const notificationBadge = document.getElementById('notificationBadge');

let isOpen = false;

function toggleChat() {
    isOpen = !isOpen;
    chatContainer.classList.toggle('active');
    chatToggle.classList.toggle('hidden');
    
    // Enlever la notification quand on ouvre le chat
    if (isOpen) {
        notificationBadge.classList.remove('active');
    }
}

chatToggle.addEventListener('click', toggleChat);
closeButton.addEventListener('click', toggleChat);

// Afficher la notification si le chat est fermé
function showNotification() {
    if (!isOpen) {
        notificationBadge.classList.add('active');
    }
}

// Fonction pour ajouter un message (isRight = true pour droite, false pour gauche)
function addMessage(text, isRight = false, author = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isRight ? 'right' : 'left'}`;
    
    // Ajouter le nom de l'auteur
    const authorDiv = document.createElement('div');
    authorDiv.className = 'message-author';
    authorDiv.textContent = author || (isRight ? 'DSIN' : 'LUMEN');
    messageDiv.appendChild(authorDiv);
    
    const bubbleDiv = document.createElement('div');
    bubbleDiv.className = 'message-bubble';
    bubbleDiv.textContent = text;
    
    messageDiv.appendChild(bubbleDiv);
    chatMessages.appendChild(messageDiv);
    
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator active';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicatorRight() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator-right active';
    typingDiv.id = 'typingIndicatorRight';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function hideTypingIndicatorRight() {
    const typingIndicatorRight = document.getElementById('typingIndicatorRight');
    if (typingIndicatorRight) {
        typingIndicatorRight.remove();
    }
}

function delayedMessage(message, isRight = false, delay = 1500) {
    if (isRight) {
        showTypingIndicatorRight();
        setTimeout(() => {
            hideTypingIndicatorRight();
            addMessage(message, isRight);
            showNotification();
        }, delay);
    } else {
        showTypingIndicator();
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(message, isRight);
            showNotification();
        }, delay);
    }
}

// Fonction principale pour gérer les épreuves
function niv(numero, valide) {
    if (valide) {
        addMessage(`Validation de l'épreuve ${numero}...`, true);
        showNotification();
        
        // Appel à l'API pour LUMEN
        fetch('api_lumen.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=epreuve_result&niveau=${numero}&valide=true`
        })
        .then(response => response.json())
        .then(data => {
            if (data.type === 'success') {
                delayedMessage(data.msg, false, 1500);
            } else {
                delayedMessage(`✅ Épreuve ${numero} réussie ! Bravo, vous pouvez passer à la suivante !`, false, 1500);
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            delayedMessage(`✅ Épreuve ${numero} réussie ! Bravo, vous pouvez passer à la suivante !`, false, 1500);
        });
        
    } else {
        addMessage(`Tentative épreuve ${numero}...`, true);
        showNotification();
        
        // Appel à l'API pour LUMEN
        fetch('get_LUMEN.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `action=epreuve_result&niveau=${numero}&valide=false` //&error_type=manipulation
        })
        .then(response => response.json())
        .then(data => {
            if (data.type === 'success') {
                delayedMessage(data.msg, false, 1500);
            } else {
                alert(JSON.stringify(data));
                delayedMessage(`❌ Épreuve ${numero} échouée. Réessayez ou demandez un indice !`, false, 1500);
            }
        })
        .catch(error => {
            alert("erreu:"  +  error)
            console.error('Erreur:', error);
            delayedMessage(`❌ Épreuve ${numero} échouée. Réessayez ou demandez un indice !`, false, 1500);
        });
    }
}