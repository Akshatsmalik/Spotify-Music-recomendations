import React from 'react';
import { PlayerProvider } from '../../context/PlayerContext';
import PlayerLayout from './PlayerLayout';
import Carousel from './Carousel';
import PlayerBar from './PlayerBar';

export default function MainPage() {
  return (
    <PlayerProvider>
      <PlayerLayout>
        <div className="landing-main">
           <Carousel />
        </div>
        
        <PlayerBar />
      </PlayerLayout>
    </PlayerProvider>
  );
}
