import Song from '../models/Song.js';

const createSong = async (req, res) => {
  const { title, artist, mood, link, userId } = req.body;

  if (!title || !artist || !mood || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const song = new Song({
      title,
      artist,
      mood,
      link,
      userId,
    });

    const createdSong = await song.save();
    res.status(201).json(createdSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSongsByUser = async (req, res) => {
  try {
    const songs = await Song.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getSongsByMood = async (req, res) => {
  try {
    const songs = await Song.find({
      userId: req.params.userId,
      mood: req.params.mood,
    }).sort({ createdAt: -1 });
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);

    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    await Song.deleteOne({ _id: req.params.id });

    res.json({ message: 'Song removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getRecentlyPlayed = async (req, res) => {
  try {
    const userId = req.params.userId || req.query.userId;
    const limit = parseInt(req.query.limit, 10) || 5;
    const filter = userId ? { userId } : {};
    const songs = await Song.find(filter).sort({ createdAt: -1 }).limit(limit);
    res.json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { createSong, getSongsByUser, getSongsByMood, deleteSong, getRecentlyPlayed };
