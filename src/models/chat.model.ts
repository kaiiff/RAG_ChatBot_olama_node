import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  documentId: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  createdAt: Date;
}

const chatSchema = new Schema(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Chat = mongoose.model<IChat>(
  "Chat",
  chatSchema
);