import React from 'react';
import roomBg from '../../assets/room-bg.png';

export default function PlayerLayout({ children }) {
  return (
    <div className="landing-root">
      <img src={roomBg} alt="Background" className="landing-bg" />
      <div className="landing-overlay"></div>
      <div className="landing-content">
        {children}
      </div>
    </div>
  );
}
