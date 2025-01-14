const express = require('express');
const router = express.Router();
const sequelize = require('../config/database'); // Import the sequelize instance
const User = require('../models/User')(sequelize); // Call the User model function with sequelize
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

// Create User

router.post('/create', async (req, res) => {
  try {
    // Destructure fields from request body
    const {
      role_id,
      name,
      email,
      email_verify_token,
      is_email,
      is_phone,
      phone,
      otp,
      password,
      is_active,
      status,
      referral_code,
      is_email_verified,
      is_phone_verified,
      phone_verified_at,
      email_verified_at,
    } = req.body;

    // Check if user with the same email or phone already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email },{ phone }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or phone already exists.' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user record
    const user = await User.create({
      role_id,
      name,
      email,
      email_verify_token,
      is_email,
      is_phone,
      phone,
      otp,
      password: hashedPassword, // Store hashed password
      is_active,
      status,
      referral_code,
      is_email_verified,
      is_phone_verified,
      phone_verified_at,
      email_verified_at,
    });

    res.status(201).json({ message: 'User created successfully!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching users.' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user.' });
  }
});

// Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's information
    const {
      role_id,
      name,
      email,
      email_verify_token,
      is_email,
      is_phone,
      phone,
      otp,
      password,
      is_active,
      status,
      referral_code,
      is_email_verified,
      is_phone_verified,
      phone_verified_at,
      email_verified_at,
    } = req.body;

    // Hash password if it's being updated
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await user.update({
      role_id,
      name,
      email,
      email_verify_token,
      is_email,
      is_phone,
      phone,
      otp,
      password: hashedPassword || user.password,
      is_active,
      status,
      referral_code,
      is_email_verified,
      is_phone_verified,
      phone_verified_at,
      email_verified_at,
    });

    res.status(200).json({ message: 'User updated successfully!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user.' });
  }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting user.' });
  }
});

module.exports = router;
