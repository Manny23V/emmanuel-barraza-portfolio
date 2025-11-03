const buttons = document.querySelectorAll('.header-button');
const underline = document.querySelector('.underline');

function moveUnderline(button, customTop = null) {
    const rect = button.getBoundingClientRect();
    const navRect = button.closest('nav').getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;

    // If customTop is provided (for Contact), move vertically
    if (customTop !== null) {
        underline.style.top = `${customTop}px`;
    } else {
        underline.style.top = ''; // reset to default bottom
    }
}

// Move underline to the active button on load
window.addEventListener('load', () => {
    const activeButton = document.querySelector('.header-button.active');
    if (activeButton) moveUnderline(activeButton);
});

// Animate underline on click then handle action
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // prevent default action

        const link = button.closest('a'); // enclosing <a> if exists
        const href = link ? link.href : null;
        const isDownload = link?.hasAttribute('download');
        const action = button.dataset.action; // for Contact button

        document.querySelector('.header-button.active')?.classList.remove('active');
        button.classList.add('active');

        // Handle underline movement
        if (action === 'scroll') {
            // Move underline to bottom of page (example: 50px from bottom)
            moveUnderline(button, window.innerHeight - 50);
        } else {
            moveUnderline(button); // normal movement
        }

        // Handle after animation
        setTimeout(() => {
            if (action === 'scroll') {
                const target = document.querySelector(button.dataset.target);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            } else if (isDownload) {
                link.click(); // trigger download
            } else if (href) {
                window.location.href = href;
            }
        }, 200); // match CSS transition duration
    });
});

window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.header-button.active');
    if (activeButton) moveUnderline(activeButton);
});