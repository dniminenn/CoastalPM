document.addEventListener('DOMContentLoaded', function() {
    let animationsApplied = false; // Flag to control the animation trigger

    // Function to add animations
    function addAnimations() {
        if (!animationsApplied) {
            const header = document.querySelector('#header');
            const imagePlaceholders = document.querySelectorAll('.image.image-placeholder');

            if (header) {
                header.classList.add('animate');
            }

            imagePlaceholders.forEach(image => {
                image.classList.add('animate');
            });

            animationsApplied = true; // Set the flag to true after applying animations
        }
    }

    // Initial call to add animations
    addAnimations();
});