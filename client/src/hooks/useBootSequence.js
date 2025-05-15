import { useState, useEffect } from 'react';

const useBootSequence = (onComplete) => {
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('Initializing system...');

  useEffect(() => {
    const bootInterval = setInterval(() => {
      setBootProgress(prev => {
        const newProgress = prev + 10;
        // Update boot messages based on progress
        if (newProgress === 30) {
          setBootMessage('Loading wardrobe database...');
        } else if (newProgress === 60) {
          setBootMessage('Analyzing fashion trends...');
        } else if (newProgress === 90) {
          setBootMessage('Calculating match algorithms...');
        } else if (newProgress >= 100) {
          setBootMessage('System ready!');
          setTimeout(() => onComplete(), 1000);
          clearInterval(bootInterval);
        }
        return newProgress;
      });
    }, 400);

    return () => clearInterval(bootInterval);
  }, [onComplete]);

  return { bootProgress, bootMessage };
};

export default useBootSequence; 