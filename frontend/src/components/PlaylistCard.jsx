import React from 'react';
import { Link } from 'react-router-dom';
import './PlaylistCard.css';

function PlaylistCard({ playlist }) {
    return (
        <div className="card playlist-card">
            <h3>{playlist.name}</h3>
            <p>{playlist.songs.length} songs</p>
            <Link to={`/playlist/${playlist._id}`} className="btn btn-secondary btn-sm">
                Open Playlist
            </Link>
        </div>
    );
}

export default PlaylistCard;