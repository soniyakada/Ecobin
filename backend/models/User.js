import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  address: String,
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;

// PickupRequest links to both User (who raised request) and Staff (if assigned).

// Staff model is independent and used only by admin/staff-specific APIs.

// User model handles auth and user/admin logins.