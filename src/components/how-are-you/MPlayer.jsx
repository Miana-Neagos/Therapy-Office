import { useRef, useState } from 'react';
import './MPlayer.css';
// import './test.css'

function MusicPlayer() {
  const playerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay(){
    if (isPlaying) {
      // Stop the YouTube playlist
      playerRef.current.src = "https://www.youtube.com/embed/15tVFFGsI1E";
    } else {
      // Play the YouTube playlist
      playerRef.current.src += "?autoplay=1";
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="music-player-container">
      <div className="player-content">
      <h2>HOW ARE YOU TODAY?</h2>
      <p>Take a moment to reflect on your thoughts and emotions.</p>
      <p>Whether joy, stress, or something in between, acknowledging your feelings is the first step towards understanding yourself better.</p>
      <p>Immerse yourself in meditation music and explore your thoughts.</p>
      {/* Add onClick event handler to call togglePlay when button is clicked */}
      <button className="play-button" onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</button>
      {/* Embed YouTube playlist */}
      <iframe 
        ref={playerRef}
        width="0" 
        height="0" 
        src="https://www.youtube.com/embed/15tVFFGsI1E"
        title="YouTube video player" 
        allow="autoplay"
      ></iframe>
      </div>
    </div>
  );
}

export default MusicPlayer;

