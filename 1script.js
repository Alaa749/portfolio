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
    navigator.clipboard.writeText(email).then(() => {
        alert(`Geen mail-app gevonden. Het e-mailadres "${email}" is gekopieerd naar je klembord — plak het in je eigen mail-app of Gmail.`);
    }).catch(() => {
        // Klembord niet beschikbaar, laat gewoon de mailto link zijn werk doen
    });
}

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

    // Detecteer of de mail-app daadwerkelijk opent (pagina verliest dan focus)
    let mailAppOpened = false;
    const onBlur = () => {
        mailAppOpened = true;
    };
    window.addEventListener('blur', onBlur);

    // Probeer de mail-app te openen
    window.location.href = `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;

    // Na een korte wachttijd checken of het gelukt is
    setTimeout(() => {
        window.removeEventListener('blur', onBlur);

        if (!mailAppOpened) {
            // Geen mail-app geopend -> kopieer als fallback
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
        // Als mailAppOpened true is: niks doen, de mail-app is al open met alles ingevuld
    }, 800);

    nameInput.value = '';
    emailInput.value = '';
    messageInput.value = '';
});