const express = require('express');
const bcrypt = require('bcrypt');
const {UserModel} = require('../model/userModel'); 
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { useremail, password } = req.body;

  try {
   
    const existingUser = await UserModel.findOne({ useremail });

    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
		useremail,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Login routes


router.post('/login', async (req, res) => {
	const { useremail, password } = req.body;
  
	try {
	  // Check if the user exists in the database
	  const user = await UserModel.findOne({ useremail });
  
	  if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	  }
  
	  // Compare the entered password with the hashed password
	  const isPasswordValid = await bcrypt.compare(password, user.password);
  
	  if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid credentials' });
	  }
  
	  // Create a JWT for authentication
	  const token = jwt.sign({ username: user.username }, 'secretKey');
  
	  res.status(200).json({ message: 'Login successful', token });
	} catch (error) {
	  console.error('Error during login:', error);
	  res.status(500).json({ message: 'Internal server error' });
	}
  });

module.exports = {router}
