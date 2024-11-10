import { Schema, model, models, Document } from "mongoose";

interface IPlayer extends Document {
  name: string;
  avatar: string;
  dob: Date;
  batting_style: string;
  bowling_style: string;
  about: string;
}

const playerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  dob: { type: Date, required: true },
  batting_style: { type: String, required: true },
  bowling_style: { type: String, required: true },
  about: { type: String, required: true },
});

const Player = models?.Player || model<IPlayer>("Player", playerSchema);

export default Player;
