document.addEventListener('DOMContentLoaded', function() {
    // Select the header and all image placeholder elements
    const header = document.querySelector('#header');
    const imagePlaceholders = document.querySelectorAll('.image.image-placeholder');

    // Add 'animate' class to the header if it exists
    if (header) {
        header.classList.add('animate');
    }

    // Add 'animate' class to all image placeholder elements
    imagePlaceholders.forEach(image => {
        image.classList.add('animate');
    });
});