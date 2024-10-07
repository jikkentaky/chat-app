import { Router } from "express";
import { verifyToken } from "../middleware/auth-middleware";
import { getAllContacts, getContactsForDMList, searchContact } from "../controllers/contacts-controller";

const contactRoutes = Router();

contactRoutes.post("/search-contact", verifyToken, searchContact);

contactRoutes.get("/get-contacts-for-dm-list", verifyToken, getContactsForDMList);

contactRoutes.get("/get-all-contacts", verifyToken, getAllContacts);

export { contactRoutes } 