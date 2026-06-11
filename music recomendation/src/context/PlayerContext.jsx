import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const PlayerContext = createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
  const [randomTracks, setRandomTracks] = useState([]);
  const [trackDetails, setTrackDetails] = useState({}); 
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [embedController, setEmbedController] = useState(null);

  useEffect(() => {
    fetchRandomTracks();
  }, []);

  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      window.SpotifyIframeApi = IFrameAPI;
    };

    if (!document.getElementById('spotify-iframe-api')) {
      const script = document.createElement('script');
      script.id = 'spotify-iframe-api';
      script.src = 'https://open.spotify.com/embed/iframe-api/v1';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (embedController && selectedTrackId) {
      embedController.loadUri(`spotify:track:${selectedTrackId}`);
      if (isPlaying) {
         embedController.play();
      }
    }
  }, [selectedTrackId, embedController]);

  const fetchRandomTracks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/random");
      const trackIds = response.data;
      setRandomTracks(trackIds);
      
      const fetchPromises = trackIds.map(async (id) => {
        if (trackDetails[id]) return null;
        try {
           const oembedRes = await axios.get(`https://open.spotify.com/oembed?url=spotify:track:${id}`);
           return { id, data: oembedRes.data };
        } catch (e) {
           console.error("Failed to fetch oembed for", id, e);
           return {
             id,
             data: {
               title: `Track ${id.substring(0, 6)}...`,
               author_name: "Unknown Artist",
               thumbnail_url: null
             }
           };
        }
      });
      
      const results = await Promise.all(fetchPromises);
      const newDetailsMap = { ...trackDetails };
      for (const res of results) {
         if (res) newDetailsMap[res.id] = res.data;
      }
      setTrackDetails(newDetailsMap);

      if (trackIds.length > 0 && !selectedTrackId) {
        setSelectedTrackId(trackIds[Math.floor(trackIds.length / 2)]); // Select middle item for carousel
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    if (!selectedTrackId) return;
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/recomendations', { id: selectedTrackId });
      const trackIds = response.data;
      console.log(trackIds)
      
      if (Array.isArray(trackIds)) {
        setRandomTracks(trackIds);
        
        const fetchPromises = trackIds.map(async (id) => {
          if (trackDetails[id]) return null;
          try {
             const oembedRes = await axios.get(`https://open.spotify.com/oembed?url=spotify:track:${id}`);
             return { id, data: oembedRes.data };
          } catch (e) {
             console.error("Failed to fetch oembed for", id, e);
             return {
               id,
               data: {
                 title: `Track ${id.substring(0, 6)}...`,
                 author_name: "Unknown Artist",
                 thumbnail_url: null
               }
             };
          }
        });
        
        const results = await Promise.all(fetchPromises);
        const newDetailsMap = { ...trackDetails };
        for (const res of results) {
           if (res) newDetailsMap[res.id] = res.data;
        }
        setTrackDetails(newDetailsMap);

        if (trackIds.length > 0) {
          setSelectedTrackId(trackIds[Math.floor(trackIds.length / 2)]);
        }
      }
    } catch (error) {
      console.error("Backend Error:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const playTrack = (id) => {
    setSelectedTrackId(id);
    setIsPlaying(true);
    if (embedController) embedController.play();
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    if (embedController) embedController.pause();
  };

  const togglePlay = () => {
    if (isPlaying) pauseTrack();
    else {
      setIsPlaying(true);
      if (embedController) embedController.togglePlay();
    }
  };

  const value = {
    randomTracks,
    trackDetails,
    selectedTrackId,
    isPlaying,
    isLoading,
    fetchRandomTracks,
    fetchRecommendations,
    playTrack,
    pauseTrack,
    togglePlay,
    setIsPlaying,
    setSelectedTrackId,
    setEmbedController
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}
