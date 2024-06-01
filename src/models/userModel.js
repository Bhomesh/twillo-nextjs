import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a UserName'],
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

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
