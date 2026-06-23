import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/");
  },

  filename: (_req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  },
});

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const isPdf = file.mimetype === "application/pdf";

  if (!isPdf) {
    return cb(new Error("Only PDF files are allowed"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
});