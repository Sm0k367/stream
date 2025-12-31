document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const audio = new Audio('media/ai_lounge_after_dark.mp3');
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            const red = (barHeight + 100) * 2;
            const green = 50 * (i / bufferLength);
            const blue = 255;

            ctx.fillStyle = `rgb(${red},${green},${blue})`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    }

    draw();

    document.getElementById('play-pause').addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    });
});
