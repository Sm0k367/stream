import * as THREE from 'three';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
// In Vite, files in /public are served from the root "/"
const RAW_FILENAME = 'Smoken Tokens wit D Dbl G.mp3';
const AUDIO_URL = `/${encodeURIComponent(RAW_FILENAME)}`;

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
const count = 8000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for(let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

    colors[i * 3] = 0.0;
    colors[i * 3 + 1] = Math.random() * 0.8; 
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const smokeSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(smokeSystem);
camera.position.z = 4;

// --- AUDIO LOGIC ---
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(AUDIO_URL);
    
    // CRITICAL: Cross-Origin must be anonymous for the Analyser to work on a live server
    audioElement.crossOrigin = "anonymous"; 
    
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
    // Resume audio context for modern browser security
    if (!audioContext) {
        audio = await initAudio();
    }
    
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    gsap.to(loader, { 
        opacity: 0, 
        duration: 1.5, 
        onComplete: () => {
            loader.style.display = 'none';
        } 
    });
    
    audio.play();
    isPlaying = true;
});

// --- ANIMATION LOOP ---
function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0005;
    smokeSystem.rotation.y = time * 0.1;

    if (isPlaying && analyser) {
        analyser.getByteFrequencyData(dataArray);
        
        let bassSum = 0;
        for(let i = 0; i < 10; i++) bassSum += dataArray[i];
        const bassIntensity = bassSum / 10 / 255; 

        const targetScale = 1 + (bassIntensity * 0.8);
        smokeSystem.scale.set(targetScale, targetScale, targetScale);
        
        // Update UI
        const progress = (audio.currentTime / audio.duration) * 100;
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) progressFill.style.width = `${progress}%`;
    }
    
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
