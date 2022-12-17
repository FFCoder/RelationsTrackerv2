import { Router } from "express";
import { ContactController } from "../controllers/Contact.Controller";

const router = Router();

router.get('/', ContactController.getContacts);
router.post('/', ContactController.addContact);
router.get('/:id', ContactController.getContact);
router.put('/:id', ContactController.updateContact);
router.delete('/:id', ContactController.deleteContact);

export default router;