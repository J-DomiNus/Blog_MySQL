const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local");
const { User, Role } = require("../models/index");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.use(
    session({
      secret: "987654",
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.session());

  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (username, password, done) => {
      let user;
      try {
        user = await User.findOne({ where: { email: username } });
      } catch (error) {
        return done(error);
      }

      if (!user) {
        return done(null, false, { message: "Credenciales incorrectas" });
      }

      const storedHash = user.password;
      const checkPassword = await bcrypt.compare(password, storedHash);
      if (!checkPassword) {
        return done(null, false, { message: "Credenciales incorrectas" });
      }

      return done(null, user);
      //-------------------------
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id, { include: Role })
      .then((user) => {
        done(null, user); // req.user
      })
      .catch(() => {
        done(error, user);
      });
  });
};
