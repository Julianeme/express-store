const passport = require('passport');

//here wi will define the strategy to be used

//1- Local Strategy
const LocalStrategy = require('./strategies/local.startegy')

passport.use(LocalStrategy);
