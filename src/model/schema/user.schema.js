import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    lowerCase: true,
    unique: true,
  },
  first_name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

const User = mongooose.model('user', userSchema);

export default User;
