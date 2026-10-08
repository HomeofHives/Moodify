import User from '../models/User.js';

const loginUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  try {
    let user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      // User exists, return user
      res.status(200).json(user);
    } else {
      // Create new user
      user = new User({
        name,
        email: email.toLowerCase(),
      });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { loginUser };