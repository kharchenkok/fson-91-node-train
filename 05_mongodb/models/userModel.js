import { model, Schema } from 'mongoose';
import { userRoles } from '../constants/index.js';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  year: {
    type: Number,
  },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.USER,
  },
  hidden: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  versionKey: false,
});

const User = model('User', userSchema);

export { User };
