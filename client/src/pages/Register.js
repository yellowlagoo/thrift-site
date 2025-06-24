import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const result = await register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      });
      
      if (result.success) {
        navigate('/');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Playfair Display, Times New Roman, Times, serif', background: '#fafafa' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'transparent',
          padding: '0',
        }}
      >
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, letterSpacing: '1px', marginBottom: '1.2rem', textAlign: 'center' }}>
          Create your account
        </h2>
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '8px 12px', borderRadius: 4, marginBottom: 12, width: '100%', textAlign: 'center', fontSize: '0.95rem' }}>
            {error}
          </div>
        )}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            fontSize: '0.98rem',
            padding: '8px 8px',
            marginBottom: 12,
            border: '1.2px solid #bbb',
            borderRadius: 2,
            fontFamily: 'inherit',
            background: '#fff',
            color: '#222',
            outline: 'none',
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            fontSize: '0.98rem',
            padding: '8px 8px',
            marginBottom: 12,
            border: '1.2px solid #bbb',
            borderRadius: 2,
            fontFamily: 'inherit',
            background: '#fff',
            color: '#222',
            outline: 'none',
          }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            fontSize: '0.98rem',
            padding: '8px 8px',
            marginBottom: 12,
            border: '1.2px solid #bbb',
            borderRadius: 2,
            fontFamily: 'inherit',
            background: '#fff',
            color: '#222',
            outline: 'none',
          }}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            fontSize: '0.98rem',
            padding: '8px 8px',
            marginBottom: 16,
            border: '1.2px solid #bbb',
            borderRadius: 2,
            fontFamily: 'inherit',
            background: '#fff',
            color: '#222',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '9px 0',
            fontSize: '1rem',
            border: '1.2px solid #222',
            background: 'transparent',
            color: '#111',
            fontFamily: 'inherit',
            fontWeight: 500,
            borderRadius: 0,
            cursor: 'pointer',
            marginBottom: 18,
            transition: 'background 0.2s',
          }}
        >
          Sign up
        </button>
        <Link
          to="/login"
          style={{
            display: 'block',
            width: '100%',
            padding: 0,
            border: 'none',
            borderRadius: 0,
            fontSize: '0.98rem',
            fontWeight: 600,
            color: '#222',
            textDecoration: 'underline',
            background: 'transparent',
            fontFamily: 'inherit',
            textAlign: 'center',
            marginTop: 0,
          }}
        >
          Already have an account? Sign in
        </Link>
      </form>
    </div>
  );
};

export default Register; 