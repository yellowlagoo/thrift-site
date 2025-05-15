import React from 'react';
import './CartoonWardrobe.css';

const StyleSuggestionsWin2k = ({ suggestions, onSelect, onClose, clothingItems, className }) => (
  <div className={`cartoon-suggestions-win2k ${className || ''}`}>
    <div className="cartoon-suggestions-titlebar">
      <span>Style Suggestions</span>
      <button className="cartoon-suggestions-close" onClick={onClose}>&times;</button>
    </div>
    <div className="cartoon-suggestions-content">
      <ul style={{ paddingLeft: 0, margin: 0, listStyle: 'none' }}>
        {suggestions.map((s, i) => (
          <li key={i} style={{ marginBottom: '1.2rem' }}>
            <button
              className="cartoon-suggestion-btn"
              onClick={() => onSelect(s.topIdx, s.bottomIdx)}
            >
              <b>{s.label}:</b> <span style={{ color: '#245edb' }}>{clothingItems.tops[s.topIdx]?.name}</span> + <span style={{ color: '#245edb' }}>{clothingItems.bottoms[s.bottomIdx]?.name}</span>
              <div style={{ fontSize: '0.98rem', color: '#666', marginTop: 2 }}>{s.desc}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default StyleSuggestionsWin2k; 