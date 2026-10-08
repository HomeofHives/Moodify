import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as api from '../api.jsx';
import SongList from '../components/SongList.jsx';

function Playlist({ user }) { // ACCEPTS user AS PROP
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        // USES user._id from prop
        const userPlaylists = await api.getPlaylistsByUser(user._id);
        const currentPlaylist = userPlaylists.find((p) => p._id === id);
        setPlaylist(currentPlaylist);
      } catch (err) {
        console.error('Failed to fetch playlist', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPlaylist();
    }
  }, [id, user]);

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  if (!playlist) {
    return <div className="container">Playlist not found.</div>;
  }

  return (
    <div className="container">
      <Link to="/dashboard" style={{ marginBottom: '16px', display: 'inline-block' }}>
        &larr; Back to Dashboard
      </Link>
      <h1>{playlist.name}</h1>
      <p style={{ color: 'var(--text-muted)' }}>{playlist.description || 'No description'}</p>
      <p style={{ color: 'var(--text-muted)' }}>{playlist.songs.length} songs</p>
      <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid var(--border-light)' }} />

      <SongList songs={playlist.songs} />
    </div>
  );
}

export default Playlist;