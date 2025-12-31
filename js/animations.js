document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.control-btn');
    const progressBar = document.getElementById('progress-bar');
    const volumeControl = document.getElementById('volume-control');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.transition = 'transform var(--transition-fast)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.transition = 'transform var(--transition-fast)';
        });

        button.addEventListener('click', () => {
            createRipple(button);
        });
    });

    progressBar.addEventListener('input', () => {
        progressBar.style.background = `linear-gradient(to right, var(--accent-cyan) ${progressBar.value}%, #fff ${progressBar.value}%)`;
    });

    volumeControl.addEventListener('input', () => {
        volumeControl.style.background = `linear-gradient(to right, var(--accent-cyan) ${volumeControl.value}%, #fff ${volumeControl.value}%)`;
    });

    function createRipple(element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${element.clientWidth / 2 - radius}px`;
        circle.style.top = `${element.clientHeight / 2 - radius}px`;
        circle.classList.add('ripple');

        const ripple = element.getElementsByClassName('ripple')[0];

        if (ripple) {
            ripple.remove();
        }

        element.appendChild(circle);
    }
});
