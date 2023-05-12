import express from "express";
import session from "express-session";
import redis from "redis";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as LineStrategy } from "passport-line-auth";
import { User } from "@/model/user";

/*const handleAuthentication = async (server: express.Express) => {
  //for traditional login
  const { default: cr } = await import("connect-redis");
  const RedisStore = cr(session);
  const redisClient = redis.createClient();

  server.use(
    session({
      name: "sessionID",
      secret: "OMG",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: "none",
        secure: false
      },
      store: new RedisStore({ client: redisClient })
    })
  );

  // for line and facebook login
  server.use(passport.initialize());
  server.use(passport.session());
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (userId, done) => {
    const user = await getMongoRepository(User).findOne(userId);
    done(null, user);
  });

  //await dotenv.config({ path: path.join(__dirname,'../../','.env') });
  const JWT_SECRET = "123456"; //process.env.JWT_SECRET;

  const cookieExtractor = (req: express.Request) => {
    let token = null;
    //console.log(req.session); //
    if (req && req.cookies) token = req.cookies["jwt"];
    return token;
  };

  const JwtOptions = {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor])
  };

  const jwtVerifyFunction = async (payload, done) => {
    //console.log(payload);//
    const viewer = (await getMongoRepository(User).findOne(payload.id)) || null;
    return done(null, viewer);
  };

  passport.use(new JwtStrategy(JwtOptions, jwtVerifyFunction));

  const facebookOptions = {
    clientID: "",
    clientSecret: "",
    callbackURL:
      "https://girlsfrontline-api-server.herokuapp.com/auth/facebook/callback",
    profileFields: [
      "id",
      "email",
      "first_name",
      "last_name",
      "gender",
      "birthday"
    ]
  };

  const facebookVerifyFunction = async (
    accessToken,
    refreshToken,
    profile,
    done
  ) => {
    let viewer =
      (await getMongoRepository(User).findOne({
        where: { email: profile._json.email }
      })) || null;
    if (!viewer) {
      viewer = getMongoRepository(User).create({
        email: profile._json.email,
        name: profile._json.first_name,
        facebookId: profile.id,
        lineId: ""
      });
      await getMongoRepository(User).save(viewer);
      return done(null, viewer);
    } else if (!viewer.facebookId) {
      viewer.facebookId = profile.id;
      await getMongoRepository(User).save(viewer);
      return done(null, viewer);
    } else return done(null, viewer);
  };

  passport.use(new FacebookStrategy(facebookOptions, facebookVerifyFunction));

  const lineOptions = {
    channelID: "",
    channelSecret: "",
    callbackURL:
      "https://girlsfrontline-api-server.herokuapp.com/auth/line/callback",
    scope: ["openid", "profile", "email"]
  };

  const lineVerifyFunction = async (
    accessToken,
    refreshToken,
    params,
    profile,
    done
  ) => {
    const payload: any = jwt.decode(params.id_token);
    let viewer =
      (await getMongoRepository(User).findOne({
        where: { email: payload.email }
      })) || null;
    if (!viewer) {
      //console.log(payload);//
      viewer = getMongoRepository(User).create({
        email: payload.email,
        name: payload.name,
        lineId: profile.id,
        facebookId: ""
      });
      await getMongoRepository(User).save(viewer);
      return done(null, viewer);
    } else if (!viewer.lineId) {
      viewer.lineId = profile.id;
      await getMongoRepository(User).save(viewer);
      return done(null, viewer);
    } else return done(null, viewer);
  };

  passport.use(new LineStrategy(lineOptions, lineVerifyFunction));

  server.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      session: false,
      scope: ["email", "user_birthday", "user_gender", "user_hometown"]
    })
  );

  server.get("/auth/facebook/callback", (req, res, next) => {
    passport.authenticate(
      "facebook",
      {
        session: false,
        scope: ["email", "user_birthday", "user_gender", "user_hometown"],
        failureRedirect:
          "https://evanhongo.github.io/Reactjs-GirlsFrontline/#/Login"
      },
      (err, viewer) => {
        const { id, email, name } = viewer;
        const token = jwt.sign({ id, email, name }, JWT_SECRET, {
          expiresIn: "1d"
        });
        res.cookie("jwt", token, {
          httpOnly: true, //阻止client端 javascript存取
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          sameSite: "none"
        });
        res.redirect(
          "https://evanhongo.github.io/Reactjs-GirlsFrontline/#/DollGuide"
        );
      }
    )(req, res, next);
  });

  server.get("/auth/line", passport.authenticate("line"));

  server.get("/auth/line/callback", (req, res, next) => {
    passport.authenticate(
      "line",
      {
        failureRedirect:
          "https://evanhongo.github.io/Reactjs-GirlsFrontline/#/Login"
      },
      (err, viewer) => {
        const { id, email, name } = viewer;
        const token = jwt.sign({ id, email, name }, JWT_SECRET, {
          expiresIn: "1d"
        });
        res.cookie("jwt", token, {
          httpOnly: true, //阻止client端 javascript存取
          secure: process.env.NODE_ENV === "production",
          maxAge: 1000 * 60 * 60 * 24, // 1 day
          sameSite: "none"
        });
        res.redirect(
          "https://evanhongo.github.io/Reactjs-GirlsFrontline/#/DollGuide"
        );
      }
    )(req, res, next);
  });

  server.use("/graphql", (req: any, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, viewer) => {
      if (viewer) {
        req.viewer = viewer;
      }

      next();
    })(req, res, next);
  });
};

export default handleAuthentication;*/
