import * as THREE from 'three';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
const AUDIO_URL = './media/track.mp3'; // Ensure your file is here!
let audioContext, analyser, dataArray, source;
let isPlaying = false;

// --- THREE.JS SCENE SETUP ---
const canvas = document.querySelector('#experience-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Create a 3D Particle Field
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);

for(let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random();
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

camera.position.z = 3;

// --- AUDIO LOGIC ---
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio(AUDIO_URL);
    source = audioContext.createMediaElementSource(audioElement);
    analyser = audioContext.createAnalyser();
    
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    return audioElement;
}

// --- INTERACTION & ANIMATION ---
const startBtn = document.querySelector('#start-btn');
const loader = document.querySelector('#loader-overlay');
let audio;

startBtn.addEventListener('click', async () => {
    // GSAP Transition Out
    gsap.to(loader, { opacity: 0, duration: 1.5, onComplete: () => loader.style.display = 'none' });
    
    audio = await initAudio();
    audio.play();
    isPlaying = true;
});

function animate() {
    requestAnimationFrame(animate);
    
    if (isPlaying && analyser) {
        analyser.getByteFrequencyData(dataArray);
        
        // Calculate average frequency (Volume/Energy)
        let sum = 0;
        for(let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        const average = sum / dataArray.length;
        const normalized = average / 128; // 0.0 to 2.0 range

        // React: Pulse particles based on audio energy
        particles.rotation.y += 0.001 + (normalized * 0.01);
        particles.scale.set(1 + normalized * 0.5, 1 + normalized * 0.5, 1 + normalized * 0.5);
        
        // Dynamic Color Shift
        particlesMaterial.color.setHSL(0.5 + (normalized * 0.2), 0.8, 0.5);
    }
    
    renderer.render(scene, camera);
}

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
