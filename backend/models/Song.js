import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    mood: {
      type: String,
      required: true,
      enum: ['Happy', 'Sad', 'Focused', 'Energetic'], 
    },
    link: {
      type: String,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model('Song', songSchema);

export default Song;