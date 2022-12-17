import express from "express";
import session from "express-session";
import logger from "./logger";
import passport from "passport";
import flash from "connect-flash";

import ContactRouter from "./routes/Contact.Routes";
import AuthRouter from "./routes/Auth.Routes";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.disable("x-powered-by");

app.set("view engine", "ejs");
app.use('/public', express.static('public'));
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

app.get("/", (req, res) => {
  res.render("index", { title: "Home", user: req.user });
});

app.use((err: any, req: any, res: any) => {
  res.send(err);
});

app.listen(3000, () => {
  logger.info("Server is running on port 3000");
  console.log("Server is running on port 3000");
});
