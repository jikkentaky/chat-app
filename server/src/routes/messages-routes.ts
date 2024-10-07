import { Router } from "express";
import { verifyToken } from "../middleware/auth-middleware";
import { getMessages, uploadFile } from "../controllers/messages-controller";
import multer from 'multer';

const messagesRoutes = Router();
const upload = multer({ dest: 'uploads/files' });

messagesRoutes.post("/get-messages", verifyToken, getMessages);
messagesRoutes.post("/upload-file", verifyToken, upload.single('file'), uploadFile);

export { messagesRoutes } 