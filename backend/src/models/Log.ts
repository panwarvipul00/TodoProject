// log
import { Schema, model } from "mongoose";

const logSchema = new Schema({
  message: String,
  stack: String,
  meta: Object,
  createdAt: { type: Date, default: Date.now }
});

export default model("Log", logSchema);
