import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'faculty', 'admin'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//?Document Middleware

//pre middleware -> pre middleware data save হওয়ার আগে কাজ করবে

userSchema.pre('save', async function (next) {
  //console.log(this, 'Post Hook: It works after save the data'); //এখানে this keyword দিয়ে data/document টাকে পাওয়া যাবে।
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  //password hashing and save to db
  user.password = await bcrypt.hash(
    user.password,
    Number(config.password_salt_rounds),
  );

  next();
});

//post middleware -> post middleware data save হওয়ার পরে কাজ করবে
userSchema.post('save', function (UserDoc, next) {
  UserDoc.password = '';

  next();
});

export const User = model<TUser>('User', userSchema);
