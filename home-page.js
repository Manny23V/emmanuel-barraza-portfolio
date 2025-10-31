// const currentPage = window.location.pathname.split("/").pop();
// const buttons = document.querySelectorAll(".header-button");

// buttons.forEach(button => {
//   const pageName = button.textContent.trim().toLowerCase().replace(" ", "");
//   if (currentPage.includes(pageName)) {
//     button.classList.add("active");
//   }
// });

const buttons = document.querySelectorAll('.header-button');
const underline = document.querySelector('.underline');

// Initialize underline under the active button
function moveUnderline(button) {
    const rect = button.getBoundingClientRect();
    const navRect = button.closest('nav').getBoundingClientRect();

    underline.style.width = `${rect.width}px`;
    underline.style.left = `${rect.left - navRect.left}px`;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.header-button.active')?.classList.remove('active');
        button.classList.add('active');
        moveUnderline(button);
    });
});

// Move underline to the first active button on load
window.addEventListener('load', () => {
    const activeButton = document.querySelector('.header-button.active');
    if (activeButton) moveUnderline(activeButton);
});


