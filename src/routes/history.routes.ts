import { Router } from "express";
import { getHistory } from "../controllers/history.controller";

const router = Router();

router.get(
  "/:documentId",
  getHistory
);

export default router;