import React from 'react';

const About = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', fontFamily: 'Playfair Display, Times New Roman, Times, serif', background: '#fafafa', paddingTop: '48px' }}>
      <div style={{ maxWidth: 700, width: '100%', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1.5rem', letterSpacing: '1px' }}>ABOUT US</h2>
        <p style={{ fontSize: '1.08rem', color: '#222', marginBottom: '1.2rem', fontFamily: 'inherit', textAlign: 'left' }}>
          Founded in 2025, <b>919</b> is a curated second-hand apparel brand dedicated to giving exceptional clothes a second life.
        </p>
        <p style={{ fontSize: '1.08rem', color: '#222', marginBottom: '2.5rem', fontFamily: 'inherit', textAlign: 'left' }}>
          Above all, we aim to make sustainability accessible and flip the narrative: second-hand items are just as valuable as new clothes. By blending hand-picked curation with AI technology, we're redefining the second-hand shopping experience.
        </p>
        <div>
          Explore a dynamic shopping experience, powered by AI.
        </div>
      </div>
    </div>
  );
};

export default About; 