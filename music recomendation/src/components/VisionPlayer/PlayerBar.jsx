import React from 'react';
import { usePlayer } from '../../context/PlayerContext';

export default function PlayerBar() {
  const { trackDetails, selectedTrackId, isPlaying, togglePlay } = usePlayer();
  const details = selectedTrackId ? trackDetails[selectedTrackId] : null;

  return (
    <div className="landing-footer">
      <div className="player-bar glass-bar">
        <div className="flex items-center gap-4 text-white/80">
          <button className="player-icon-btn">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
               <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
             </svg>
          </button>
          
          <button className="player-icon-btn player-icon-btn--main" onClick={togglePlay}>
            {isPlaying ? (
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                 <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
               </svg>
            ) : (
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                 <path d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
               </svg>
            )}
          </button>
          
          <button className="player-icon-btn">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
               <path d="M4.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.692-1.01-1.233-.696L4.404 7.304a.802.802 0 0 0 0 1.393z"/>
             </svg>
          </button>
        </div>

        <div className="player-meta">
          {details ? (
            <img src={details.thumbnail_url} alt="Track" className="player-thumb" crossOrigin="anonymous"/>
          ) : (
            <div className="player-thumb bg-gray-700"></div>
          )}
         {/*  <div className="flex-1 overflow-hidden min-w-[120px]">
             <div className="text-white text-sm font-medium truncate">{details ? details.title : 'No Track'}</div>
             <div className="text-white/60 text-xs truncate">{details ? details.author_name : 'No Artist'}</div>
          </div>
          
          <div className="text-xs text-white/50 w-10 text-right">0:00</div>
          
          <div className="player-progress">
             <div className="player-track">
                <div className="player-fill" style={{ width: '0%' }}></div>
                <div className="player-knob" style={{ left: '0%' }}></div>
             </div>
          </div> 
          
          <div className="text-xs text-white/50 w-10">0:00</div>
        </div> */}

        <div className="flex items-center gap-3 text-white/80 pl-4 border-l border-white/10">
           <button className="player-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
              </svg>
           </button>
           <button className="player-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
           </button>
           <button className="player-icon-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/>
              </svg>
           </button>
        </div>
      </div>
      
      <div className="window-chrome mt-2">
         <div className="window-grab"></div>
         <div className="window-dot"></div>
      </div>
    </div>
  );
}
