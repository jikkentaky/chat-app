import { Router } from "express";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/channel-controller";
import { verifyToken } from "../middleware/auth-middleware";

const channelRoutes = Router();

channelRoutes.post("/create-channel", verifyToken, createChannel);
channelRoutes.get("/get-user-channels", verifyToken, getUserChannels);
channelRoutes.get("/get-channel-messages/:channelId", verifyToken, getChannelMessages);

export { channelRoutes }