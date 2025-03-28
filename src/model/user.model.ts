import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

UserSchema.pre('save', async function(next) {
  const password = await bcrypt.hash(this.password ?? '', 10);
  this.password = password;
  next();
})

export default mongoose.model('Users', UserSchema);
