import express from "express";
import cors from "cors";
import documentRoutes from "./routes/document.routes"
import chatRoutes from "./routes/chat.routes"
import historyRoutes from "./routes/history.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "PDF Chatbot API is running 🚀",
  });
});

app.use("/api/documents",documentRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/history", historyRoutes)

export default app;