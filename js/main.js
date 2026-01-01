document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to AI Hub!');
    
    // Example of interactive elements for demos
    function showTextGenerationDemo() {
        alert('Text Generation Demo coming soon!');
    }

    function showImageGenerationDemo() {
        alert('Image Generation Demo coming soon!');
    }

    function showVoiceSynthesisDemo() {
        alert('Voice Synthesis Demo coming soon!');
    }

    function showChatbotDemo() {
        alert('Chatbot Demo coming soon!');
    }

    // Expose functions to global scope for button onclick events
    window.showTextGenerationDemo = showTextGenerationDemo;
    window.showImageGenerationDemo = showImageGenerationDemo;
    window.showVoiceSynthesisDemo = showVoiceSynthesisDemo;
    window.showChatbotDemo = showChatbotDemo;
});
