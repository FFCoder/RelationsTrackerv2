import { Contact } from "../models";
import logger from "../logger";

export class ContactController {
  public static async getContacts(req: any, res: any) {
    try {
      const contacts = await Contact.findAll();
      res.send(contacts);
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error retrieving contacts",
      });
    }
  }

  public static async addContact(req: any, res: any) {
    try {
      const contact = await Contact.create(req.body);
      res.send(contact);
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error adding contact",
      });
    }
  }

  public static async getContact(req: any, res: any) {
    try {
      const contact = await Contact.findByPk(req.params.id);
      res.send(contact);
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error retrieving contact",
      });
    }
  }

  public static async updateContact(req: any, res: any) {
    try {
      const contact = await Contact.findByPk(req.params.id);
      contact?.update(req.body);
      res.send(contact);
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error updating contact",
      });
    }
  }

  public static async deleteContact(req: any, res: any) {
    try {
      const contact = await Contact.findByPk(req.params.id);
      contact?.destroy();
      res.send(contact);
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error deleting contact",
      });
    }
  }
}
