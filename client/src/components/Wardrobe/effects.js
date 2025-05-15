import { useState } from 'react';

export function useWardrobeEffects() {
  // Popup/confetti
  const [popup, setPopup] = useState({ visible: false, message: '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOrigin, setConfettiOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  // Popup helper
  const showPopup = (message) => {
    setPopup({ visible: true, message });
    setTimeout(() => setPopup({ visible: false, message: '' }), 1700);
  };

  return {
    popup, setPopup,
    showConfetti, setShowConfetti,
    confettiOrigin, setConfettiOrigin,
    showPopup
  };
} 