import React, { useState } from 'react';
import * as api from '../api.jsx';
import './SongForm.css';

const MOODS = ['Happy', 'Sad', 'Focused', 'Energetic'];

function SongForm({ user, onClose, onSongAdded }) { // ACCEPTS user AS PROP
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [mood, setMood] = useState(MOODS[0]);
  const [link, setLink] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !artist) {
      setError('Title and Artist are required');
      return;
    }
    setError('');

    try {
      const songData = {
        title,
        artist,
        mood,
        link,
        userId: user._id, // USES user._id from prop
      };
      const newSong = await api.createSong(songData);
      onSongAdded(newSong);
    } catch (err) {
      setError('Failed to add song. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Song</h2>
          <button onClick={onClose} className="modal-close-btn">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Artist</label>
            <input
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mood</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              {MOODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Link (Optional)</label>
            <input
              type="text"
              placeholder="http://youtube.com/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SongForm;