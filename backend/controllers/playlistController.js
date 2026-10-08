import Playlist from '../models/Playlist.js';
import Song from '../models/Song.js';

const createPlaylist = async (req, res) => {
  const { name, description, userId } = req.body;

  if (!name || !userId) {
    return res.status(400).json({ message: 'Name and userId are required' });
  }

  try {
    const playlist = new Playlist({
      name,
      description,
      userId,
      songs: [],
    });

    const createdPlaylist = await playlist.save();
    res.status(201).json(createdPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getPlaylistsByUser = async (req, res) => {
  try {
    const playlists = await Playlist.find({
      userId: req.params.userId,
    })
      .populate('songs')
      .sort({ createdAt: -1 });
    res.json(playlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);

    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // if song is already in the playlist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ message: 'Song already in playlist' });
    }

    playlist.songs.push(songId);
    await playlist.save();

    const updatedPlaylist = await Playlist.findById(playlistId).populate(
      'songs'
    );
    res.json(updatedPlaylist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { createPlaylist, getPlaylistsByUser, addSongToPlaylist };