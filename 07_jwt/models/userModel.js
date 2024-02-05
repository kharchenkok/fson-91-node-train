import { model, Schema } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
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
// MONGOOSE HOOKS
// userSchema.pre('find', () => {
//   console.log('find hook'); // буде працювати тільки на методі find
// });
// userSchema.pre(/^find/, () => {
//   console.log('all find hooks'); // буде працювати на всіх методах, які починаються з find(findById, findByIdAndDelete)
// });

// Pre save hook fires on "save" and "create" methods.
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);

  // const passwordIsValid = await bcrypt.compare('Pass_1234', hashedPassword);

  next();
});

// CUSTOM METHODS
userSchema.methods.checkPassword = (candidate, passwordHash) => compare(candidate, passwordHash);

const User = model('User', userSchema);

export { User };
