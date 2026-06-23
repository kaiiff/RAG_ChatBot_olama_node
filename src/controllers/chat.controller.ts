import { Request, Response } from "express";
import { askPdf } from "../services/chat.service";

export const askQuestion = async (
  req: Request,
  res: Response
) => {
  try {
    const { documentId,question } = req.body;

    const answer = await askPdf(
  documentId,
  question
);

    return res.status(200).json({
      success: true,
      data: answer, 
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};