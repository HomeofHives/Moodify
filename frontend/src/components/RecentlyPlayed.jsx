import './SongList.css';

function RecentlyPlayed({ songs = [], limit = 5 }) {
  const recent = songs.slice(0, limit);

  if (!recent || recent.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        No recently played tracks.
      </div>
    );
  }

  return (
    <div className="song-list">
      {recent.map((song) => (
        <div className="card song-card" key={song._id}>
          <div className="song-card-info">
            <h4>{song.title}</h4>
            <p>{song.artist}</p>
          </div>
          <div className="song-card-actions">
            <span className={`badge badge-${song.mood}`}>{song.mood}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentlyPlayed;
