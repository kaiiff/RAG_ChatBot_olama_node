import { Request, Response } from "express";
import { Chat } from "../models/chat.model";

export const getHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId } = req.params;

    const chats = await Chat.find({
      documentId,
    }).sort({
      createdAt: 1,
    });

    return res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};