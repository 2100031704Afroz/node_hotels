const passport = require('passport');
const Person = require('./models/person');
const LocalStrategy = require('passport-local').Strategy;

// Configure the local strategy for use by Passport
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // Find the user by username
    const user = await Person.findOne({ username: username });
    
    // If the user is not found, return a message
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    // Compare the provided password with the stored password
    const isPasswordMatch = await user.comparePassword(password);
    
    // If the passwords do not match, return a message
    if (!isPasswordMatch) {
      return done(null, false, { message: "Password incorrect" });
    }

    // If everything is fine, return the user object
    return done(null, user);
  } catch (err) {
    // In case of any errors, return the error
    return done(err);
  }
}));

module.exports = passport;
