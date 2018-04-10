import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';


const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  name: String,
  address: String,
  age: {
    type: Number,
    min: 0,
    max: 120,
  },
  email: String,
  updated: {
    type: Date,
    default: Date.now,
  },
  password: {
  type: String,
  required: true,
},
});


ContactSchema.pre('update', function(callback) {
   console.log('update');
   callback();
});

// Execute before each user.save() call
ContactSchema.pre('save', function(callback) {
  const contact = this;
  // Break out if the password hasn't changed
  if (!contact.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, (err, salt) => {
    if (err) return callback(err);

    bcrypt.hash(contact.password, salt, null, (err, hash) => {
      if (err) return callback(err);
      contact.password = hash;
      callback();
    });
  });
});

ContactSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


export default mongoose.model('Contact', ContactSchema);
