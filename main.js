import * as THREE from 'three';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
// We will rename your mp3 to 'track.mp3' in the next step to avoid URL errors
const AUDIO_URL = '/track.mp3'; 

let audioContext, analyser, dataArray, source, audio;
let isPlaying = false;

// --- THREE.JS SETUP ---
const canvas = document.querySelector('#experience-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- SMOKE NEBULA ---
const particlesGeometry = new THREE.BufferGeometry();
const count = 5000;
const positions = new Float32Array(count * 3);

for(let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00f3ff,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending
});

const smokeSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(smokeSystem);
camera.position.z = 3;

// --- AUDIO LOGIC ---
async function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audio = new Audio(AUDIO_URL);
    audio.crossOrigin = "anonymous";
    
    source = audioContext.createMediaElementSource(audio);
    analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

// --- START BUTTON EVENT ---
const startBtn = document.querySelector('#start-btn');
const loader = document.querySelector('#loader-overlay');

startBtn.addEventListener('click', async () => {
    if (!audioContext) await initAudio();
    
    audioContext.resume();
    audio.play();
    isPlaying = true;

    gsap.to(loader, { 
        opacity: 0, 
        duration: 1, 
        onComplete: () => loader.style.display = 'none' 
    });
});

// --- ANIMATION ---
function animate() {
    requestAnimationFrame(animate);
    
    if (isPlaying && analyser) {
        analyser.getByteFrequencyData(dataArray);
        
        // Use the first few frequency bins for bass-reactive scaling
        const bassValue = dataArray[2] / 255; 
        const scale = 1 + bassValue * 0.5;
        smokeSystem.scale.set(scale, scale, scale);
        
        // Update Progress Bar
        const progress = (audio.currentTime / audio.duration) * 100;
        document.querySelector('.progress-fill').style.width = `${progress}%`;
        
        // Update Time
        const min = Math.floor(audio.currentTime / 60);
        const sec = Math.floor(audio.currentTime % 60);
        document.querySelector('.time-current').innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    smokeSystem.rotation.y += 0.002;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
