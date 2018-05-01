import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); // eslint-disable-line

// Get all contacts, using try/catch to handle errors
router.get('/', auth.isAuthenticated, async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    handleError(res, error.message);
  }
});

// Create a contact, using async handler
router.post('/', asyncHandler(async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      success: false,
      msg: 'Please pass username and password.',
    });
  };

  if (req.query.action === 'register') {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    // save the user
    await newUser.save();
    res.json({
      success: true,
      msg: 'Successful created new user.',
    });
  } else {
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) return res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
        // if user is found and password is right create a token
        const token = jwt.sign(user, config.secret);
        // return the information including token as JSON
        res.json({
          success: true,
          token: 'JWT ' + token,
        });
      } else {
        res.status(401).send({
          success: false,
          msg: 'Authentication failed. Wrong password.',
        });
      }
    });
  };
}));

// Update a contact
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const contact = await Contact.update({
    _id: req.params.id,
  }, req.body, {
    upsert: false,
  });
  if (!contact) return res.sendStatus(404);
  return res.json(200, contact);
}));

// Delete a contact
router.delete('/:id', asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.send(404);
  await contact.remove();
  return res.status(204).send(contact);
}));
