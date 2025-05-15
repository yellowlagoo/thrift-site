import React, { useEffect, useRef } from 'react';
import './ConfettiGlitter.css';

const COLORS = [
  '#fff', '#ffe066', '#ffd6fa', '#b5e0ff', '#ffb3b3', '#c3ffd6', '#e0b3ff', '#f7c873', '#f7e6ff', '#b3f7e6', '#f7b3e6', '#e6f7b3', '#b3e6f7', '#f7b3b3', '#f7f7b3'
];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

const ConfettiGlitter = ({ onDone, origin }) => {
  const confettiRef = useRef();

  useEffect(() => {
    const confetti = confettiRef.current;
    const count = 48;
    const particles = [];
    const { x, y } = origin || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-glitter-particle';
      // Calculate random angle and distance
      const angle = randomBetween(0, 2 * Math.PI);
      const distance = randomBetween(120, 340);
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      el.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
      el.style.opacity = randomBetween(0.7, 1);
      el.style.width = el.style.height = `${randomBetween(7, 13)}px`;
      el.style.boxShadow = `0 0 8px 2px #fff8, 0 0 2px 1px #fff4`;
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '20%';
      el.style.transform = `translate(${x}px, ${y}px) rotate(${randomBetween(0, 360)}deg)`;
      el.style.animation = `confettiGlitterBurst 1.1s cubic-bezier(.42,1.52,.58,1) forwards, confettiGlitterTwinkle 0.7s infinite alternate`;
      el.style.setProperty('--dx', `${dx}px`);
      el.style.setProperty('--dy', `${dy}px`);
      el.style.animationDelay = `${randomBetween(0, 0.2)}s`;
      confetti.appendChild(el);
      particles.push(el);
    }
    const timer = setTimeout(() => {
      if (onDone) onDone();
    }, 1200);
    return () => {
      clearTimeout(timer);
      particles.forEach(el => confetti.removeChild(el));
    };
  }, [onDone, origin]);

  return <div className="confetti-glitter-overlay" ref={confettiRef}></div>;
};

export default ConfettiGlitter; 