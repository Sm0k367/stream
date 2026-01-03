// --- SMART SCALING LOGIC ---
function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update Camera
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update Renderer
    renderer.setSize(width, height);
    
    // Pixel Ratio Limit (Crucial for mobile performance)
    // We cap it at 2 to prevent high-end phones from overworking the GPU
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Responsive Particle Density
    // On small screens, we move the camera back slightly so the nebula isn't "in your face"
    if (width < 768) {
        camera.position.z = 6; 
        particlesMaterial.size = 0.05; // Larger particles for visibility on small screens
    } else {
        camera.position.z = 4;
        particlesMaterial.size = 0.03;
    }
}

window.addEventListener('resize', handleResize);
handleResize(); // Run once at start

// --- ENHANCED TOUCH SUPPORT ---
// This allows users to "swirl" the smoke with their fingers on mobile
let mouseX = 0;
let mouseY = 0;

const handleMove = (event) => {
    // Works for both Mouse and Touch
    const x = event.touches ? event.touches[0].clientX : event.clientX;
    const y = event.touches ? event.touches[0].clientY : event.clientY;
    
    mouseX = (x / window.innerWidth) - 0.5;
    mouseY = (y / window.innerHeight) - 0.5;
};

window.addEventListener('mousemove', handleMove);
window.addEventListener('touchmove', handleMove);

// Update the animate loop to include the "parallax" drift
function animate() {
    requestAnimationFrame(animate);
    
    // Smoothly drift the smoke toward the user's touch/mouse
    smokeSystem.rotation.x += (mouseY * 0.05 - smokeSystem.rotation.x) * 0.05;
    smokeSystem.rotation.y += (mouseX * 0.05 - smokeSystem.rotation.y) * 0.05;

    // ... (rest of your existing audio logic here)
    
    renderer.render(scene, camera);
}
