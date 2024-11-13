import { model, Schema } from 'mongoose';

interface ISession {
  userEmails: string[];
  code: string;
}

const sessionSchema = new Schema<ISession>({
  userEmails: { type: [String], required: true },
  code: { type: String, required: true },
}, { timestamps: true });

const Session = model<ISession>('Session', sessionSchema);

export { Session, ISession };



