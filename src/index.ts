import express from "express";
import session from "express-session";
import logger from "./logger";
import passport from "passport";
import flash from "connect-flash";
import { join } from "path";

import ContactRouter from "./routes/Contact.Routes";
import AuthRouter from "./routes/Auth.Routes";

import dotenv from "dotenv";
import { Contact, User } from "./models";
dotenv.config({
  path: join(__dirname, "..", "..", ".env"),
});

const app = express();
app.disable("x-powered-by");

app.set("view engine", "ejs");
app.use('/public', express.static('public'));
app.get('/favicon.ico', (req, res) => res.sendFile(join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret keyboard animal",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate('session'));

app.use("/contacts", ContactRouter);
app.use("/auth", AuthRouter);

app.get("/", async (req, res) => {
  const authUser = <any>req.user;
  const userModel: any = authUser ? (await User.findOne({ where: { userName: authUser["userName"] }, include: Contact })) : null;
  if (userModel) {
    logger.info(`User ${userModel.get("userName")} is logged in`);
    logger.info("User Model: " + JSON.stringify(userModel, null, 2));
  }
  res.render("index", { title: "Home", user: userModel, contacts: userModel?.Contacts })
});

app.listen(3000, () => {
  logger.info("Server is running on port 3000");
  console.log("Server is running on port 3000");
});
