// backend/routes/userRoutes.js
import express from 'express';
import User from '../models/User.js'; // make sure your User model exists

const router = express.Router();

// GET user by email
router.get('/find', async (req, res) => {
  try {
    const email = req.query.query; // frontend sends ?query=email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
