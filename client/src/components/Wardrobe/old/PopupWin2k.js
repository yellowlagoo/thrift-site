import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './CartoonWardrobe.css';

const PopupWin2k = ({ visible, message, onClose }) =>
  visible ? (
    <div className="popup-win2k">
      <div className="popup-win2k-titlebar">
        <span>Notification</span>
        <button className="popup-win2k-close" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="popup-win2k-content">{message}</div>
    </div>
  ) : null;

export default PopupWin2k; 