import * as THREE from 'three';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
// We encode the URI to safely handle the spaces in your filename
const RAW_FILENAME = 'Smoken Tokens wit D Dbl G.mp3';
const AUDIO_URL = `./media/${encodeURIComponent(RAW_FILENAME)}`;

let audioContext, analyser, dataArray, source;
let isPlaying = false;

// --- THREE.JS SCENE SETUP ---
const canvas = document.querySelector('#experience-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- SMOKE NEBULA GENERATOR ---
const particlesGeometry = new THREE.BufferGeometry();
const count = 8000; // Increased for a denser "smoke" feel
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
const sizes = new Float32Array(count);

for(let i = 0; i < count; i++) {
    // Create a "cloud" distribution
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

    // DJ Smoke Palette: Cyans, Purples, and Deep Teals
    colors[i * 3] = 0.0; // Red
    colors[i * 3 + 1] = Math.random() * 0.8; // Green (for that "Smoke" tint)
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.5; // Blue
    
    sizes[i] = Math.random() * 0.05;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
});

const smokeSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(smokeSystem);

camera.position.z = 4;

// --- AUDIO LOGIC ---
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(AUDIO_URL);
    audioElement.crossOrigin = "anonymous"; // Important for Vercel/External hosting
    
    source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 512;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    return audioElement;
}

// --- INTERACTION ---
const startBtn = document.querySelector('#start-btn');
const loader = document.querySelector('#loader-overlay');
let audio;

startBtn.addEventListener('click', async () => {
    gsap.to(loader, { 
        opacity: 0, 
        duration: 1.5, 
        onComplete: () => {
            loader.style.display = 'none';
            // Start the glitch pulse on the UI
            document.querySelector('.glitch-text').classList.add('active');
        } 
    });
    
    audio = await initAudio();
    audioContext.resume();
    audio.play();
    isPlaying = true;
});

// --- THE ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    
    const time = Date.now() * 0.0005;

    // Slow "Drift" movement
    smokeSystem.rotation.y = time * 0.1;
    smokeSystem.rotation.x = time * 0.05;

    if (isPlaying && analyser) {
        analyser.getByteFrequencyData(dataArray);
        
        // Target the Bass frequencies (first 10 bins)
        let bassSum = 0;
        for(let i = 0; i < 10; i++) bassSum += dataArray[i];
        const bassIntensity = bassSum / 10 / 255; 

        // Visual Reactivity
        // 1. Scale the nebula with the bass
        const targetScale = 1 + (bassIntensity * 0.8);
        smokeSystem.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        // 2. Flash colors on high intensity
        if(bassIntensity > 0.6) {
            particlesMaterial.color.setHSL(0.5, 1, 0.5 + (bassIntensity * 0.2));
        } else {
            particlesMaterial.color.setHSL(0.6, 0.8, 0.4);
        }

        // 3. Update UI Progress Bar
        const progress = (audio.currentTime / audio.duration) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        document.querySelector('.time-current').innerText = formatTime(audio.currentTime);
    }
    
    renderer.render(scene, camera);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Resize Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
