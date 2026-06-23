import { Router } from "express";
import { upload } from "../middlewares/upload.middleware";
import { uploadDocument,getDocuments, getDocument, getDocumentChunks } from "../controllers/document.controller";

const router = Router();

router.post(
  "/upload",
  upload.single("pdf"),
  uploadDocument
);

router.get("/", getDocuments);
router.get("/:id", getDocument);
router.get(
  "/:id/chunks",
  getDocumentChunks
);


export default router;