document.addEventListener('DOMContentLoaded', () => {
    const audio = new Audio('media/240.mp3');
    const playPauseButton = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const volumeControl = document.getElementById('volume-control');
    const timeDisplay = document.getElementById('time-display');
    const shuffleButton = document.getElementById('shuffle');
    const repeatButton = document.getElementById('repeat');

    let isPlaying = false;
    let isShuffle = false;
    let repeatMode = 0; // 0: No Repeat, 1: Repeat All, 2: Repeat One

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseButton.textContent = 'Play';
        } else {
            audio.play();
            playPauseButton.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;
        timeDisplay.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audio.duration;
        audio.currentTime = seekTime;
    });

    volumeControl.addEventListener('input', () => {
        audio.volume = volumeControl.value / 100;
    });

    shuffleButton.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleButton.style.backgroundColor = isShuffle ? 'var(--accent-magenta)' : 'var(--accent-cyan)';
    });

    repeatButton.addEventListener('click', () => {
        repeatMode = (repeatMode + 1) % 3;
        switch (repeatMode) {
            case 0:
                repeatButton.style.backgroundColor = 'var(--accent-cyan)';
                break;
            case 1:
                repeatButton.style.backgroundColor = 'var(--accent-magenta)';
                break;
            case 2:
                repeatButton.style.backgroundColor = 'var(--accent-purple)';
                break;
        }
    });

    audio.addEventListener('ended', () => {
        if (repeatMode === 1) {
            audio.currentTime = 0;
            audio.play();
        } else if (repeatMode === 2) {
            audio.play();
        } else {
            playPauseButton.textContent = 'Play';
            isPlaying = false;
        }
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
