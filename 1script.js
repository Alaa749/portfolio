// Sterren-achtergrond
const starsContainer = document.getElementById('stars');
const starCount = 150;

for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    starsContainer.appendChild(star);
}

// Fallback: als mailto niet werkt (geen mail-app ingesteld), kopieer het adres
function copyEmailFallback(event, email) {
    let mailAppOpened = false;
    const onBlur = () => {
        mailAppOpened = true;
    };
    window.addEventListener('blur', onBlur);

    setTimeout(() => {
        window.removeEventListener('blur', onBlur);
        if (!mailAppOpened) {
            navigator.clipboard.writeText(email).then(() => {
                alert(`Geen mail-app gevonden. Het e-mailadres "${email}" is gekopieerd naar je klembord.`);
            }).catch(() => {
                alert(`Geen mail-app gevonden. Stuur handmatig een bericht naar ${email}.`);
            });
        }
    }, 800);
}

// Contactformulier
document.querySelector('.contact-form button').addEventListener('click', (e) => {
    e.preventDefault();

    const nameInput = document.querySelector('.contact-form input[type="text"]');
    const emailInput = document.querySelector('.contact-form input[type="email"]');
    const messageInput = document.querySelector('.contact-form textarea');

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
        alert('Vul alle velden in!');
        return;
    }

    const to = '101450@glr.nl';
    const subject = `Portfolio contact - ${nameInput.value}`;

    const plainBody =
`Naam: ${nameInput.value}
Email: ${emailInput.value}
Bericht: ${messageInput.value}`;

    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(plainBody);

    let mailAppOpened = false;
    const onBlur = () => {
        mailAppOpened = true;
    };
    window.addEventListener('blur', onBlur);

    window.location.href = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;

    setTimeout(() => {
        window.removeEventListener('blur', onBlur);

        if (!mailAppOpened) {
            const clipboardText =
`Aan: ${to}
Onderwerp: ${subject}

${plainBody}`;

            navigator.clipboard.writeText(clipboardText).then(() => {
                alert(`Er kon geen mail-app geopend worden. Je bericht is gekopieerd naar je klembord — plak het in een e-mail naar ${to}.`);
            }).catch(() => {
                alert(`Er kon geen mail-app geopend worden. Stuur je bericht handmatig naar ${to}.`);
            });
        }
    }, 800);

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});
