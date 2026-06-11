import React from 'react';
import { usePlayer } from '../../context/PlayerContext';

export default function TopNavBar() {
  const { fetchRandomTracks, isLoading } = usePlayer();

  return (
    <nav className="top-nav glass-bar">
      <button className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
        </svg>
        <span>Listen Now</span>
      </button>
      <button className="nav-item nav-item--active" onClick={fetchRandomTracks} disabled={isLoading}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <span>{isLoading ? "Loading..." : "Browse"}</span>
      </button>
      <button className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M11.534 9.534a.5.5 0 0 1 .532-.192l.86.215a.5.5 0 0 1 .38.404c.094.75-.125 1.442-.516 1.94-.43.548-1.092.86-1.892.86-.799 0-1.46-.312-1.891-.86-.391-.498-.61-1.19-.516-1.94a.5.5 0 0 1 .38-.404l.86-.215a.5.5 0 0 1 .532.192c.152.203.265.44.321.688.056-.248.169-.485.321-.688zM6.466 9.534a.5.5 0 0 0-.532-.192l-.86.215a.5.5 0 0 0-.38.404c-.094.75.125 1.442.516 1.94.43.548 1.092.86 1.892.86.799 0 1.46-.312 1.891-.86.391-.498.61-1.19.516-1.94a.5.5 0 0 0-.38-.404l-.86-.215a.5.5 0 0 0-.532.192C5.992 9.737 5.88 9.974 5.823 10.222c-.056-.248-.169-.485-.321-.688zM8 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        </svg>
        <span>Radio</span>
      </button>
      <button className="nav-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
        </svg>
        <span>Playlists</span>
      </button>
    </nav>
  );
}
