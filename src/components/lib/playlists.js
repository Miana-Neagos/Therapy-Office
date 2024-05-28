// const YOUTUBE_PLAYLIST_ID = 'PLT2eOpjZ2tjeUbeo7uM27a1Ysbk4FAs9J';
// const YOUTUBE_API_KEY = '-sLNwJY0V78A';

// export async function fetchPlaylist(setPlaylist) {
//   try {
//     const response = await fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${YOUTUBE_PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`);
//     const data = await response.json();

//     if (data.items && data.items.length > 0) {
//       const playlistUrl = `https://www.youtube.com/playlist?list=${YOUTUBE_PLAYLIST_ID}`;
//       setPlaylist(playlistUrl)
//     }
//   } catch (error) {
//     console.error('Error fetching the playlist:', error);
//     setPlaylist('Error fetching the playlist')
//   }
// }