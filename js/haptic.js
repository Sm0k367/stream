document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.control-btn');
    const volumeControl = document.getElementById('volume-control');
    const progressBar = document.getElementById('progress-bar');

    // Function to trigger haptic feedback
    function triggerHapticFeedback() {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    // Add haptic feedback to buttons
    buttons.forEach(button => {
        button.addEventListener('click', triggerHapticFeedback);
    });

    // Add haptic feedback to volume control
    volumeControl.addEventListener('input', triggerHapticFeedback);

    // Add haptic feedback to progress bar
    progressBar.addEventListener('input', triggerHapticFeedback);
});
