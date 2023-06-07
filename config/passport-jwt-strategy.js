const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const env = require("./environment");
const Seller = require("../models/seller");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(opts, async function (jwtPayLoad, done) {
    const seller = await Seller.findById(jwtPayLoad._id);

    if (!seller) {
      return done(null, false);
    }
    return done(null, seller);
  })
);

module.exports = passport;
