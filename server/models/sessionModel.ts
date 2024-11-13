import { model, Schema } from 'mongoose';

interface ISession {
  usersIds: string[];
  code: string;
}

const sessionSchema = new Schema<ISession>({
  usersIds: { type: [String], required: true },
  code: { type: String, required: true },
}, { timestamps: true });

const Session = model<ISession>('Session', sessionSchema);

export { Session, ISession };



