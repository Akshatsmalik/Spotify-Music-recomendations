import React, { useEffect, useRef } from 'react';
import { usePlayer } from '../../context/PlayerContext';

export default function Carousel() {
  const { randomTracks, trackDetails, selectedTrackId, playTrack, setEmbedController, fetchRecommendations, isLoading } = usePlayer();
  const iframeRef = useRef(null);

  useEffect(() => {
    // Only initialize if we haven't already and API is ready
    if (!window.SpotifyIframeApi || !iframeRef.current) return;
    if (iframeRef.current.hasAttribute('data-initialized')) return;

    const options = {
      width: '100%',
      height: '100%',
      uri: selectedTrackId ? `spotify:track:${selectedTrackId}` : 'spotify:track:5kWAeTEx4M7x0k174wXg5m' // Default placeholder
    };

    const callback = (EmbedController) => {
      setEmbedController(EmbedController);
      iframeRef.current.setAttribute('data-initialized', 'true');
    };

    window.SpotifyIframeApi.createController(iframeRef.current, options, callback);
  }, [setEmbedController, selectedTrackId]);


  if (randomTracks.length === 0) {
    return (
      <div className="carousel-stage">
        <div className="text-white/50 text-sm">No tracks loaded. Click "Browse" or "Listen Now".</div>
      </div>
    );
  }

  const selectedIndex = selectedTrackId ? randomTracks.indexOf(selectedTrackId) : Math.floor(randomTracks.length / 2);

  return (
    <div className="carousel-stage w-full relative">
      {/* Hidden Spotify iframe used to handle audio playback */}
      <div className="hidden">
         <div ref={iframeRef}></div>
      </div>

      {randomTracks.map((trackId, index) => {
        const details = trackDetails[trackId];
        const isActive = index === selectedIndex;
        // Calculate offset from center (-2, -1, 0, 1, 2)
        const offset = index - selectedIndex;
        
        return (
          <button
            key={trackId}
            className="carousel-card"
            style={{ '--offset': offset, zIndex: 10 - Math.abs(offset) }}
            onClick={() => playTrack(trackId)}
          >
            {details?.thumbnail_url ? (
               <img 
                 src={details.thumbnail_url} 
                 alt={details.title || "Track cover"} 
                 className={`carousel-cover ${isActive ? 'carousel-cover--active' : ''}`}
                 crossOrigin="anonymous"
               />
            ) : (
               <div className={`carousel-cover bg-gray-800 flex items-center justify-center ${isActive ? 'carousel-cover--active' : ''}`}>
                 <span className="text-gray-500 text-xs text-center px-2">Loading...</span>
               </div>
            )}
          </button>
        );
      })}
      
      {/* Active Track Label & Recommendations Button */}
      {selectedTrackId && trackDetails[selectedTrackId] && (
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full animate-fade-in transition-opacity duration-500">
           <div className="text-center">
              <div className="text-white font-medium text-lg drop-shadow-md">{trackDetails[selectedTrackId].title}</div>
              <div className="text-white/70 text-sm">{trackDetails[selectedTrackId].author_name}</div>
           </div>
           
           <button 
              onClick={() => {
                if (isLoading) return;
                fetchRecommendations();
              }}
              className="glass-pill cursor-pointer hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-2"
           >
              {isLoading ? (
                <span className="text-sm">Loading...</span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                  </svg>
                  <span>Get Recommendations</span>
                </>
              )}
           </button>
        </div>
      )}
    </div>
  );
}
