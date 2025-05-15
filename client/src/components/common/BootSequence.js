import React from 'react';
import '../../styles/BootSequence.css';
import useBootSequence from '../../hooks/useBootSequence';

const BootSequence = ({ onComplete }) => {
  const { bootProgress, bootMessage } = useBootSequence(onComplete);

  return (
    <div className="boot-overlay">
      <div className="boot-content">
        <div className="boot-title">901 FASHION SYSTEM v3.0</div>
        <div className="boot-message">{bootMessage}</div>
        <div className="boot-progress">
          <div 
            className="boot-bar" 
            style={{ width: `${bootProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootSequence; 