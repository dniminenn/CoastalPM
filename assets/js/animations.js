document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('#header');
    const imagePlaceholders = document.querySelectorAll('.image.image-placeholder');

    // Function to handle post-animation actions
    const finalizeAnimation = (element) => {
        element.classList.remove('animate');
        element.classList.add('done');
    };

    // Add 'animate' class and set timeout to add 'done' class
    if (header) {
        header.classList.add('animate');
        setTimeout(() => finalizeAnimation(header), 3000); // Wait 3 seconds then finalize
    }

    imagePlaceholders.forEach(image => {
        image.classList.add('animate');
        setTimeout(() => finalizeAnimation(image), 3000); // Apply the same for each placeholder
    });
});
