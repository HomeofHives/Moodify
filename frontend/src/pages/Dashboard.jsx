import React, { useState, useEffect } from 'react';
import * as api from '../api.jsx';
import SongList from '../components/SongList.jsx';
import RecentlyPlayed from '../components/RecentlyPlayed.jsx';
import PlaylistCard from '../components/PlaylistCard.jsx';
import SongForm from '../components/SongForm.jsx';
import './Dashboard.css';

const MOODS = ['Happy', 'Sad', 'Focused', 'Energetic'];

function Dashboard({ user }) { // ACCEPTS user AS PROP
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [activeMood, setActiveMood] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const fetchData = async () => {
    if (user) { 
      const userSongs = await api.getSongsByUser(user._id); // USES user._id from prop
      const userPlaylists = await api.getPlaylistsByUser(user._id);
      setSongs(userSongs);
      setFilteredSongs(userSongs);
      setPlaylists(userPlaylists);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handleMoodFilter = (mood) => {
    if (activeMood === mood) {
      setActiveMood(null);
      setFilteredSongs(songs);
    } else {
      setActiveMood(mood);
      const filtered = songs.filter((song) => song.mood === mood);
      setFilteredSongs(filtered);
    }
  };
  
  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!newPlaylistName) return;
    try {
      const newPlaylist = await api.createPlaylist({ name: newPlaylistName, userId: user._id });
      setPlaylists([newPlaylist, ...playlists]);
      setNewPlaylistName('');
    } catch (err) {
      console.error("Failed to create playlist", err);
    }
  };

  const handleSongAdded = (newSong) => {
    setSongs([newSong, ...songs]);
    if (!activeMood || newSong.mood === activeMood) {
      setFilteredSongs([newSong, ...filteredSongs]);
    }
    setIsModalOpen(false);
  };
  
  const handleAddSongToPlaylist = async (songId, playlistId) => {
    try {
      await api.addSongToPlaylist(playlistId, songId);
      const userPlaylists = await api.getPlaylistsByUser(user._id);
      setPlaylists(userPlaylists);
    } catch(err) {
      console.error("Failed to add song", err);
      alert(err.response?.data?.message || "Failed to add song");
    }
  };

  // 🚨 NEW DELETE HANDLER FUNCTION 🚨
  const handleDeleteSong = async (songId) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await api.deleteSong(songId);
        
        // Remove from main list
        setSongs(prevSongs => prevSongs.filter(s => s._id !== songId));
        
        // Remove from filtered list
        setFilteredSongs(prevFiltered => prevFiltered.filter(s => s._id !== songId));
        
        // Optionally, re-fetch playlists if the song might have been in one, 
        // or implement logic to remove the song ID from the playlist arrays client-side.
        // For simplicity, we re-fetch all playlists here:
        const userPlaylists = await api.getPlaylistsByUser(user._id);
        setPlaylists(userPlaylists);

      } catch (err) {
        console.error("Failed to delete song", err);
        alert("Failed to delete song. Check console for details.");
      }
    }
  };


  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          Add Song
        </button>
      </div>

      <div className="dashboard-layout">
        <div className="songs-section">
          <h2>Recently Played</h2>
          <RecentlyPlayed songs={songs} />
          <h2>Your Songs</h2>
          <div className="mood-selector">
            {MOODS.map((mood) => (
              <button
                key={mood}
                className={`mood-btn ${activeMood === mood ? `active active-${mood}` : ''}`}
                onClick={() => handleMoodFilter(mood)}
              >
                {mood}
              </button>
            ))}
          </div>

          <SongList 
            songs={filteredSongs} 
            playlists={playlists}
            onAddSongToPlaylist={handleAddSongToPlaylist}
            onDeleteSong={handleDeleteSong} // 🚨 PASS NEW FUNCTION AS PROP
          />
        </div>

        <div className="playlist-section">
          <h2>Playlists</h2>
          <form onSubmit={handleCreatePlaylist} className="card">
             <div className="form-group">
                <input 
                  type="text"
                  placeholder="New playlist name..."
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                />
             </div>
             <button type="submit" className="btn btn-secondary btn-sm" style={{width: '100%'}}>
               Create Playlist
             </button>
          </form>
          
          <div className="playlist-list">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
          </div>
        </div>
      </div>

      {/* PROP DRILLING: Pass user to SongForm */}
      {isModalOpen && (
        <SongForm
          user={user} 
          onClose={() => setIsModalOpen(false)}
          onSongAdded={handleSongAdded}
        />
      )}
    </div>
  );
}

export default Dashboard;