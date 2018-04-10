// Load required packages
import passport from 'passport';
const BasicStrategy = require('passport-http').BasicStrategy;
import Contact from '../contacts/contactModel';

passport.use(new BasicStrategy(
  function(email, password, callback) {
    Contact.findOne({email: email}, (err, contact) => {
      if (err) { return callback(err); }

      // No user found with that username
      if (!contact) { return callback(null, false); }

      // Make sure the password is correct
      contact.verifyPassword(password, (err, isMatch) => {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, contact);
      });
    });
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
