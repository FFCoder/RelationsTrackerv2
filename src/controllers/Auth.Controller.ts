import { User } from "../models";
import logger from "../logger";

export class AuthController {
  private static async verifyUserName(userName: string) {
    // Ensure that username does not have any special characters
    const regex = /^[a-zA-Z0-9]+$/;
    if (!regex.test(userName)) {
      return false;
    }

    // Ensure that username is not already taken
    const user = await User.findOne({ where: { userName: userName } });
    if (user) {
      return false;
    }

    return true;
  }

  private static async verifyEmail(email: string) {
    // Ensure that email is not already taken
    const user = await User.findOne({ where: { email: email } });
    if (user) {
      return false;
    }

    // Verify that email is valid
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      return false;
    }

    return true;
  }

  private static verifyNameField(name: string) {
    /**
     * Ensure that name does not have 
     * any special characters other than spaces and dashes
     */
    const regex = /^[a-zA-Z0-9 -]+$/;
    if (!regex.test(name)) {
      return false;
    }

    return true;
  }

  public static async getUser(req: any, res: any) {
    try {
      const user = await User.findByPk(req.params.id);
      res.send(user);
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error retrieving user",
      });
    }
  }

  private static verifyPassword(password: string) {
    // Ensure that password is at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Ensure that password has at least one uppercase letter
    const regex = /[A-Z]/;
    if (!regex.test(password)) {
      return false;
    }

    // Ensure that password has at least one number and a special character
    const regex2 = /[0-9!@#$%^&*]/;
    if (!regex2.test(password)) {
      return false;
    }
    
    return true;
  }

  /**
   * Register a new user
   */
  public static async register(req: any, res: any) {
    try {
      const {
        userName,
        firstName,
        lastName,
        email
      } = req.body;

      // Verify that username is valid
      if (!(await AuthController.verifyUserName(userName))) {
        req.flash("error", "Invalid username");
        res.redirect("/auth/register");
      }

      // Verify that password is valid
      if (!AuthController.verifyPassword(req.body.password)) {
        req.flash("error", "Invalid password");
        res.redirect("/auth/register");
      }

      // Verify that email is valid
      if (!(await AuthController.verifyEmail(email))) {
        req.flash("error", "Invalid email");
        res.redirect("/auth/register");
      }

      // Verify that first name is valid
      if (!AuthController.verifyNameField(firstName)) {
        req.flash("error", "Invalid first name");
        res.redirect("/auth/register");
      }

      // Verify that last name is valid
      if (!AuthController.verifyNameField(lastName)) {
        req.flash("error", "Invalid last name");
        res.redirect("/auth/register");
      }

      // Create new user
      await User.create(req.body);

      res.render('auth/login', { title: "Login" });
    } catch (error) {
      logger.error(error);
      res.status(500).send({
        message: "Error adding user",
      });
    }
  }
}