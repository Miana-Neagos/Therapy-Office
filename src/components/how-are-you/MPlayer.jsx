import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./MPlayer.css";

/**
 * MusicPlayer component provides a simple interface for playing and stopping meditation music.
 * component utilizes the ReactPlayer library to embed and control a YouTube video
 */
function MusicPlayer() {
  //state to manage the play/pause status of the music
  const [isPlaying, setIsPlaying] = useState(false);
  //toggle the play/pause state
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="music-player-container">
      <div className="player-content">
        <h3>HOW ARE YOU TODAY?</h3>
        <p>Take a moment to reflect on your thoughts and emotions.</p>
        <p>
          Whether joy, stress, or something in between, acknowledging your
          feelings is the first step towards understanding yourself better.
        </p>
        <p>Immerse yourself in meditation music and explore your thoughts.</p>
        <button className="play-button" onClick={togglePlay}>
          {isPlaying ? "Stop" : "Play"}
        </button>
        <ReactPlayer className="react-player"
          // url="https://www.youtube.com/watch?v=15tVFFGsI1E"
          url="https://www.youtube.com/watch?v=7vcTRWE2_u8"
          playing={isPlaying}
          width="0"
          height="0"
        />
      </div>
    </div>
  );
}

export default MusicPlayer;