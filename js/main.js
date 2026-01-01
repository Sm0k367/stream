document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to the AI Showcase!');
    
    // Example of an interactive element
    const exampleImage = document.querySelector('.example-image');
    exampleImage.addEventListener('click', () => {
        alert('You clicked the example image!');
    });
});
