import express from 'express';
import {
  createSong,
  getSongsByUser,
  getSongsByMood,
  deleteSong, // 🚨 IMPORTED NEW FUNCTION
} from '../controllers/songController.js';

const router = express.Router();

router.post('/', createSong);
router.get('/:userId', getSongsByUser);
router.get('/:userId/:mood', getSongsByMood);
router.delete('/:id', deleteSong);

export default router;