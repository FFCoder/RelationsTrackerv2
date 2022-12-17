import { Router } from "express";
import { AuthController } from "../controllers/Auth.Controller";
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";
import crypto from "crypto";
import { User } from "../models";
import { join } from "path";
import rateLimiter from 'express-rate-limit';
import logger from "../logger";

const router = Router();
const loginLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many login attempts from this IP, please try again after 15 minutes",
});

passport.use(
  new LocalStrategy((username: string, password: string, done: Function) => {
    User.findOne({ where: { userName: username } })
      .then((user) => {
        if (!user) {
          logger.error("Unable to find user. Supplied username: " + username);
          return done(null, false, { message: "Incorrect username." });
        }
        logger.info("Found user: " + user.get("userName"));
        const hash = crypto
          .pbkdf2Sync(
            password,
            <string>user.get("userName"),
            1000,
            64,
            "sha512"
          )
          .toString("hex");
        if (hash !== user.get("password")) {
          logger.error("Incorrect password.");
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      })
      .catch((err) => {
        console.error(err);
        logger.error("Error finding user: " + err);
        return done(err);
      });
  })
);

passport.serializeUser(function(user: any, cb) {
  const data = { userName: user.get("userName"), firstName: user.get("firstName"), lastName: user.get("lastName") };
  logger.info("Serializing user: " + data.userName);
  cb(null, data);
});


passport.deserializeUser(function(user: Express.User, cb) {
  return cb(null, user);
});

router.get("/login", (req, res) => {
  logger.info("Request User: " + req.user)
  res.render('auth/login', { title: "Login", user: req.user, errors: req.flash("error") });
});

router.post(
  "/login",
  loginLimiter,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failWithError: true,
    failureFlash: true,
    failureMessage: "Invalid username or password",
  })
);

router.get("/register", (req, res) => {
  res.render('auth/register', { title: "Register", user: req.user, errors: req.flash("error") });
});

router.post("/register", async (req, res) => {
 await AuthController.register(req, res);
});

router.get("/logout", (req, res) => {
  req.logout((err: any) => {
    if (err) {
      logger.error("Error logging out: " + err);
      res.status(500).send("Error logging out");
    }
  });
  res.redirect("/");
});

export default router;
