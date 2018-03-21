import dotenv from 'dotenv';
import express from 'express';
import contactsRouter from './api/contacts';

dotenv.config();

const app = express();

const port = process.env.PORT;

const middleware1 = (req, res, next) => {
  console.log('in middleware 1');
  // next(new Error('BOOM!')); // for error handler example
   next(); // for general middleware example
};

const middleware2 = (req, res, next) => {
  console.log('in middleware 2');
//  next(new Error('BOOM!')); // for error handler example
   next(); // for general middleware example
};

const errorHandler1 = (err, req, res, next) => {
  console.log('error handler!!!');
  console.log(err);
  next();
};

app.use(middleware1);
app.use(middleware2);
app.use(express.static('public'));
app.use('/api/contacts', contactsRouter);
app.use(errorHandler1);


app.listen(port, () => {
  console.info(`Server running at ${port}`);
});
