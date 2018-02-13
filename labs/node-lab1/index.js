import dotenv from 'dotenv';
import express from 'express';
import greeting from './greeting';
import contactsRouter from './api/contacts';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.static('public'));

app.use('/api/contacts', contactsRouter);
app.use(express.static('public'));

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
