import { Document } from "../models/document.model";
import { extractPdfText } from "./pdf.service";
import { createChunks } from "./chunk.service";

export const createDocument = async (
  file: Express.Multer.File
) => {
  return await Document.create({
    originalName: file.originalname,
    filename: file.filename,
    path: file.path,
    size: file.size,
  });
};

export const getAllDocuments = async () => {
  return await Document.find().sort({
    createdAt: -1,
  });
};

export const processDocument = async (
  documentId: string
) => {
  const document =
    await Document.findById(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  document.status = "processing";

  await document.save();

  try {
    const text = await extractPdfText(
      document.path
    );

    document.text = text;
    await createChunks(
  document._id.toString(),
  text
);
    document.status = "processed";

    await document.save();

    return document;
  } catch (error) {
    document.status = "failed";

    await document.save();

    throw error;
  }
};

export const getDocumentById = async (
  id: string
) => {
  return Document.findById(id);
};