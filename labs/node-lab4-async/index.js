import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';
import postsRouter from './api/posts';
import mongoose from 'mongoose';
import {loadContacts} from './contactsData';
import {loadPosts} from './postsData';
import {Mockgoose} from 'mockgoose';

dotenv.config();

export const app = express();

const port = process.env.PORT;

// Connect to database
if (process.env.NODE_ENV == 'test') {
  // use mockgoose for testing
  const mockgoose=new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(()=>{
    mongoose.connect(process.env.mongoDB);
  });
} else {
  // use real deal for everything else
  mongoose.connect(process.env.mongoDB);
}

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error: '+ err);
    process.exit(-1);
});

// Populate DB with sample data
if (process.env.seedDb) {
  loadContacts();
  loadPosts();
}

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use('/api/posts', postsRouter);

// add middleware to handle any errors.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Something broke! ${err.message}`);
});

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
