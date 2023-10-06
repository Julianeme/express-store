const passport = require('passport');

//here wi will define the strategy to be used

//1- Local Strategy
const LocalStrategy = require('./strategies/local.startegy')

//2- JWT Strategy

const JwtStrategy = require('./strategies/jwt.strategy')

passport.use(LocalStrategy);
passport.use(JwtStrategy);
