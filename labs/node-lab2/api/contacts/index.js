import express from 'express';
import {contacts} from './contacts';

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
  res.send({contacts: contacts});
});

router.post('/', (req, res) => {
        let newContact = req.body;
        if (newContact){
          contacts.push({name: newContact.name, address : newContact.address, phone_number: newContact.phone_number }) ;
          res.status(201).send({message: "Contact Created"});
      }else{
            res.status(400).send({message: "Unable to find Contact in request. No Contact Found in body"});
      }
});

export default router;
