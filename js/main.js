document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to AI Hub!');
    
    // Text Generation Demo
    function showTextGenerationDemo() {
        const demoContent = document.getElementById('text-generation-demo');
        demoContent.innerHTML = `
            <textarea id="text-input" placeholder="Enter your prompt here..."></textarea>
            <button onclick="generateText()">Generate Text</button>
            <div id="text-output"></div>
        `;
    }

    // Image Generation Demo
    function showImageGenerationDemo() {
        const demoContent = document.getElementById('image-generation-demo');
        demoContent.innerHTML = `
            <textarea id="image-input" placeholder="Describe the image you want..."></textarea>
            <button onclick="generateImage()">Generate Image</button>
            <div id="image-output"></div>
        `;
    }

    // Voice Synthesis Demo
    function showVoiceSynthesisDemo() {
        const demoContent = document.getElementById('voice-synthesis-demo');
        demoContent.innerHTML = `
            <textarea id="voice-input" placeholder="Enter text to synthesize..."></textarea>
            <button onclick="synthesizeVoice()">Synthesize Voice</button>
            <audio id="voice-output" controls></audio>
        `;
    }

    // Chatbot Demo
    function showChatbotDemo() {
        const demoContent = document.getElementById('chatbot-demo');
        demoContent.innerHTML = `
            <div id="chatbot-messages"></div>
            <input type="text" id="chatbot-input" placeholder="Type your message...">
            <button onclick="sendMessage()">Send</button>
        `;
    }

    // Text Generation Functionality
    window.generateText = function() {
        const input = document.getElementById('text-input').value;
        const output = document.getElementById('text-output');
        // Simulate text generation
        output.innerHTML = `<p>Generated Text: ${input}</p>`;
    };

    // Image Generation Functionality
    window.generateImage = function() {
        const input = document.getElementById('image-input').value;
        const output = document.getElementById('image-output');
        // Simulate image generation
        output.innerHTML = `<img src="assets/mindseye1.jpeg.jpg" alt="Generated Image">`;
    };

    // Voice Synthesis Functionality
    window.synthesizeVoice = function() {
        const input = document.getElementById('voice-input').value;
        const output = document.getElementById('voice-output');
        // Simulate voice synthesis
        output.src = 'media/240.mp3';
        output.play();
    };

    // Chatbot Functionality
    window.sendMessage = function() {
        const input = document.getElementById('chatbot-input').value;
        const messages = document.getElementById('chatbot-messages');
        // Simulate chatbot response
        messages.innerHTML += `<div class="message user-message">${input}</div>`;
        messages.innerHTML += `<div class="message bot-message">This is a simulated response.</div>`;
        document.getElementById('chatbot-input').value = '';
    };

    // Expose functions to global scope for button onclick events
    window.showTextGenerationDemo = showTextGenerationDemo;
    window.showImageGenerationDemo = showImageGenerationDemo;
    window.showVoiceSynthesisDemo = showVoiceSynthesisDemo;
    window.showChatbotDemo = showChatbotDemo;
});
