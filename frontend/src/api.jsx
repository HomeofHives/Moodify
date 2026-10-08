import axios from 'axios';

const API_URL = '/api';

// === User APIs ===
export const loginUser = async (name, email) => {
  const { data } = await axios.post(`${API_URL}/users/login`, { name, email });
  return data;
};

// === Song APIs ===
export const createSong = async (songData) => {
  const { data } = await axios.post(`${API_URL}/songs`, songData);
  return data;
};

export const getSongsByUser = async (userId) => {
  const { data } = await axios.get(`${API_URL}/songs/${userId}`);
  return data;
};

export const getSongsByMood = async (userId, mood) => {
  const { data } = await axios.get(`${API_URL}/songs/${userId}/${mood}`);
  return data;
};

export const deleteSong = async (songId) => {
  const { data } = await axios.delete(`${API_URL}/songs/${songId}`);
  return data;
};

// === Playlist APIs ===
export const createPlaylist = async (playlistData) => {
  const { data } = await axios.post(`${API_URL}/playlists`, playlistData);
  return data;
};

export const getPlaylistsByUser = async (userId) => {
  const { data } = await axios.get(`${API_URL}/playlists/${userId}`);
  return data;
};

export const addSongToPlaylist = async (playlistId, songId) => {
  const { data } = await axios.post(`${API_URL}/playlists/add-song`, {
    playlistId,
    songId,
  });
  return data;
};