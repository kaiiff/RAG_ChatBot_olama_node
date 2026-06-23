import mongoose, { Schema } from "mongoose";

const documentSchema = new Schema(
  {
    originalName: {
      type: String,
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    path: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "processing",
        "processed",
        "failed",
      ],
      default: "uploaded",
    },
  },
  {
    timestamps: true,
  }
);

export const Document = mongoose.model(
  "Document",
  documentSchema
);