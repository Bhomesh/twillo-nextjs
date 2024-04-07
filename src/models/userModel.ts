import { verify } from 'crypto';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a UserName'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide a Email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a Password'],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgetPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
