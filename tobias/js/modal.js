document.addEventListener('DOMContentLoaded', () => {
    const closeButton = document.querySelector("[data-close-modal]");
    const modal = document.querySelector("[data-modal]");

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            modal.close();
        });
    } else {
        console.error('Close button not found');
    }

    // Select all .card elements
    const cards = document.querySelectorAll('.card');

    // Add a click event listener to each card
    cards.forEach(card => {
        let isDragging = false;
        let startX, startY;

        card.addEventListener('mousedown', (e) => {
            isDragging = false;
            startX = e.pageX;
            startY = e.pageY;
        });

        card.addEventListener('mousemove', (e) => {
            if (Math.abs(e.pageX - startX) > 5 || Math.abs(e.pageY - startY) > 5) {
                isDragging = true;
            }
        });

        card.addEventListener('mouseup', () => {
            if (!isDragging && modal) {
                modal.showModal();
            }
        });
    });
});