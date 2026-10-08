import express from 'express';
import {
  createPlaylist,
  getPlaylistsByUser,
  addSongToPlaylist,
} from '../controllers/playlistController.js';

const router = express.Router();

router.post('/', createPlaylist);
router.get('/:userId', getPlaylistsByUser);
router.post('/add-song', addSongToPlaylist);

export default router;