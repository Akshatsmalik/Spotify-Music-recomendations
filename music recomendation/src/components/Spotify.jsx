import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export function InteractiveTrackWidget({ trackId, onPlay, currentlyPlayingId }) {
  const containerRef = useRef(null);

  const isPlaying = trackId === currentlyPlayingId;
  useEffect(() => {
    if (!window.SpotifyIframeApi) return;

    const element = containerRef.current;
    const options = {
      width: '100%',
      height: '152',
      uri: `spotify:track:${trackId}`
    };

    const callback = (EmbedController) => {
      EmbedController.addListener('playback_update', e => {
        if (e.data.isPaused === false) {
          onPlay(trackId); 
        }
      });
    };

    window.SpotifyIframeApi.createController(element, options, callback);
  }, [trackId, onPlay]); 

  return (
    <div 
      className={`mb-4 rounded-xl overflow-hidden border-4 transition-all duration-300 ${
        isPlaying ? 'border-green-500 shadow-lg scale-105' : 'border-transparent'
      }`} 
      ref={containerRef}
    ></div>
  );
}
export default function Spotify() {
  const [selectedid, Setselectedid] = useState(null);
  const [previousid,setpreviousid] = useState(null);
  const [Trackinfo, setTrackinfo] = useState(null);
  const [randomTracks, setRandomTracks] = useState([]); 
  
  const [isSpotifyReady, setIsSpotifyReady] = useState(false);
  
  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      window.SpotifyIframeApi = IFrameAPI;
      setIsSpotifyReady(true);
    };

    if (!document.getElementById('spotify-iframe-api')) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api';
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.SpotifyIframeApi) {
      setIsSpotifyReady(true);
    }
  }, []);
  

  const handleFetchClick = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/random");
      const data = response.data; 
      setRandomTracks(data); 
      console.log("Fetched Tracks:", data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }


  const handleTrackPlayed = (extractedId) => {
    Setselectedid(extractedId);
    console.log(extractedId);
  }

  
  const newsongrecomendation = async()=>{
    if (!selectedid){
      console.log('Click somthing some song or somethin')
      return
    }
    setpreviousid(selectedid)

    try {
      const response = await axios.post('http://127.0.0.1:8000/recomendations', 
        { id: selectedid});
      console.log("Got Recommendations!", response.data);

    } catch (error) {
      console.error("Backend Validation Error:", error.response?.data);
    }}

    
  return (
    <div className="p-4 flex flex-col gap-4">
      <button 
        className='bg-green-900 border-2 text-white p-2 rounded' 
        onClick={handleFetchClick}
      > 
        GET 5 RANDOM TRACKS
      </button>
      
      {randomTracks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-black font-bold mb-4">Your Random Playlist:</h3>
          
          {isSpotifyReady ? (
            <div className="flex flex-col gap-4"> 
              {randomTracks.map((trackId) => (
                <InteractiveTrackWidget 
                  key={trackId} 
                  trackId={trackId} 
                  onPlay={handleTrackPlayed} 
                  currentlyPlayingId={selectedid} 
                />
              ))}
            </div>
          ) : (
            <p>Loading audio players...</p>
          )}
        </div>
      )}
      <div>
        <button
        className='bg-red-950 border-2 text-white p-2 rounded'
        onClick={newsongrecomendation}>
          Click here
        </button>
      </div>
    </div>
  );
}