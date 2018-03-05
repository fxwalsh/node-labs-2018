import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';
import bodyParser from 'body-parser';
import postsRouter from './api/posts';
import mongoose from 'mongoose';
import {loadContacts} from './contactsData';
import {loadPosts} from './postsData';

dotenv.config();

const app = express();

const port = process.env.PORT;

mongoose.connect(process.env.mongoDB);
// Populate DB with sample data
if (process.env.seedDb) {
  loadContacts();
  loadPosts();
}

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/api/contacts', contactsRouter);
app.use('/api/posts', postsRouter);

app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
