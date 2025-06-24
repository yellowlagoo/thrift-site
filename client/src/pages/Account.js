import React from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, Times New Roman, Times, serif', background: '#fafafa' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '2rem', textAlign: 'center' }}>WELCOME</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', width: 240 }}>
        <button
          style={{
            width: '100%',
            padding: '0.7rem 0',
            fontSize: '1.1rem',
            border: '1.5px solid #222',
            background: 'transparent',
            fontFamily: 'inherit',
            fontWeight: 400,
            cursor: 'pointer',
            marginBottom: 0,
            transition: 'background 0.2s',
          }}
          onClick={() => navigate('/login')}
        >
          Log In
        </button>
        <button
          style={{
            width: '100%',
            padding: '0.7rem 0',
            fontSize: '1.1rem',
            border: '1.5px solid #222',
            background: 'transparent',
            fontFamily: 'inherit',
            fontWeight: 400,
            cursor: 'pointer',
            marginBottom: 0,
            transition: 'background 0.2s',
          }}
          onClick={() => navigate('/register')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Account; 