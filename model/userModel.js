const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	useremail: { type: String, required: true },
  password: { type: String, required: true },
 
});

const UserModel = mongoose.model('User', userSchema);

module.exports= {UserModel}