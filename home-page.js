const buttons = document.querySelectorAll('.header-button');
const underline = document.querySelector('.underline');

function moveUnderline(button, customTop = null) {
    const rect = button.getBoundingClientRect();
    const navRect = button.closest('nav').getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;

    if (customTop !== null) {
        underline.style.top = `${customTop}px`;
    } else {
        underline.style.top = '';
    }
}

window.addEventListener('load', () => {
    const activeButton = document.querySelector('.header-button.active');
    if (activeButton) moveUnderline(activeButton);
});

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        const link = button.closest('a');
        const href = link ? link.href : null;
        const isDownload = link?.hasAttribute('download');
        const action = button.dataset.action;

        document.querySelector('.header-button.active')?.classList.remove('active');
        button.classList.add('active');

        if (action === 'scroll') {

            moveUnderline(button, window.innerHeight - 50);
        } else {
            moveUnderline(button);
        }

        setTimeout(() => {
            if (action === 'scroll') {
                const target = document.querySelector(button.dataset.target);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            } else if (isDownload) {
                link.click();
            } else if (href) {
                window.location.href = href;
            }
        }, 200);
    });
});

window.addEventListener('resize', () => {
    const activeButton = document.querySelector('.header-button.active');
    if (activeButton) moveUnderline(activeButton);
});