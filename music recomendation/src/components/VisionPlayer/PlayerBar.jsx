import React from 'react';
import { usePlayer } from '../../context/PlayerContext';

export default function PlayerBar() {
  const { trackDetails, selectedTrackId, isPlaying, togglePlay } = usePlayer();
  const details = selectedTrackId ? trackDetails[selectedTrackId] : null;

  return (
    <footer className="landing-footer">
      <div className="player-bar glass-bar flex items-center justify-between px-4">
        
        {/* Controls Section */}
        <div className="flex items-center gap-4 text-white/80">
          <button className="player-icon-btn" aria-label="Previous">
            {/* SVG Path */}
          </button>
          
          <button className="player-icon-btn player-icon-btn--main" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
            {/* Conditional SVG */}
          </button>
          
          <button className="player-icon-btn" aria-label="Next">
             {/* SVG Path */}
          </button>
        </div>

        {/* Track Metadata Section */}
        <div className="flex items-center gap-4 flex-1 mx-4">
           {details ? (
             <img src={details.thumbnail_url} alt={details.title} className="player-thumb" crossOrigin="anonymous"/>
           ) : (
             <div className="player-thumb bg-gray-700"></div>
           )}
           <div className="flex-1 overflow-hidden">
             <div className="text-white text-sm font-medium truncate">{details?.title ?? 'No Track'}</div>
             <div className="text-white/60 text-xs truncate">{details?.author_name ?? 'No Artist'}</div>
           </div>
           {/* Progress UI would go here */}
           <div className="text-xs text-white/50 w-10">0:00</div>
        </div>

        {/* Utilities Section */}
        <div className="flex items-center gap-3 text-white/80 pl-4 border-l border-white/10">
           {/* Icons for Queue, Volume, etc */}
        </div>
      </div>
      
      <div className="window-chrome mt-2">
         <div className="window-grab"></div>
         <div className="window-dot"></div>
      </div>
    </footer>
  );
}
