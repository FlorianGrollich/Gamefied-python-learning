import { model, Schema } from 'mongoose';

interface IUser {
  displayName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  displayName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


const User = model<IUser>('User', userSchema);

export { User, IUser };