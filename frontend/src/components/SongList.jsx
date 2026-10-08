import './SongList.css';

const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
  </svg>
);

function SongList({ songs, playlists, onAddSongToPlaylist, onDeleteSong }) {

  const handleAddClick = (songId, e) => {
    const playlistId = e.target.value;
    if (playlistId) {
      onAddSongToPlaylist(songId, playlistId);
      e.target.value = "";
    }
  };

  if (!songs || songs.length === 0) {
    return <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
      No songs found.
    </div>
  }

  return (
    <div className="song-list">
      {songs.map((song) => (
        <div className="card song-card" key={song._id}>
          <div className="song-card-info">
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
          <div className="song-card-actions">
            <span className={`badge badge-${song.mood}`}>{song.mood}</span>

            {/* Link Icon */}
            {song.link && (
              <a
                href={song.link}
                target="_blank"
                rel="noopener noreferrer"
                className="song-card-link"
                title="Open link"
              >
                <LinkIcon />
              </a>
            )}

            {/* Add to Playlist Dropdown */}
            {onAddSongToPlaylist && (
              <select onChange={(e) => handleAddClick(song._id, e)} className="btn-sm" style={{ maxWidth: '120px' }}>
                <option value="">Add to...</option>
                {playlists && playlists.map(p => (
                  <option className="list" key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            )}

            {/* DELETE BUTTON */}
            {onDeleteSong && (
              <button
                onClick={() => onDeleteSong(song._id)}
                className="btn btn-sm"
                style={{ backgroundColor: '#EF4444', color: 'white', marginLeft: '8px' }}
              >
                Delete
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}

export default SongList;