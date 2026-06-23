import { Request, Response } from "express";
import { createDocument, getAllDocuments,getDocumentById,processDocument  } from "../services/document.service";
import { getChunksByDocumentId } from "../services/chunk.service";

export const uploadDocument = async (
  req: Request,
  res: Response
) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const document =
      await createDocument(req.file);

    await processDocument(
      document._id.toString()
    );

    return res.status(201).json({
      success: true,
      message: "PDF uploaded and processed",
      data: document,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

export const getDocuments = async (
  _req: Request,
  res: Response
) => {
  const documents =
    await getAllDocuments();

  res.json({
    success: true,
    data: documents,
  });
};


export const getDocument = async (
  req: Request,
  res: Response
) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const document =
    await getDocumentById(id);

  if (!document) {
    return res.status(404).json({
      success: false,
      message: "Document not found",
    });
  }

  res.json({
    success: true,
    data: document,
  });
};

export const getDocumentChunks =
  async (
    req: Request,
    res: Response
  ) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const chunks =
      await getChunksByDocumentId(
        id
      );

    res.json({
      success: true,
      count: chunks.length,
      data: chunks,
    });
  };