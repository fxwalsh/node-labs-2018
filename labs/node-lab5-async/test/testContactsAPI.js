import supertest from 'supertest';
import {app} from './../index.js';
import should from 'should'; // eslint-disable-line
// UNIT test begin
describe('Contacts API unit test', function() {
  this.timeout(120000); // eslint-disable-line
  // #1 return a collection of json documents
  it('should return collection of JSON documents', function(done) {
    // calling home page api
    supertest(app)
    .get('/api/contacts')
    .expect('Content-type', /json/)
    .expect(200) // This is the HTTP response
    .end(function(err, res) {
        console.log('outputting returned contacts: ' + res.body);
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
    });
  });

  // #2 add a contact
  it('should add a contact', function(done) {
    // post to /api/contacts
    supertest(app)
    .post('/api/contacts')
    .send({name: 'Contact 99', address: '123 Strand St'})
    .expect('Content-type', /json/)
    .expect(201)
    .end(function(err, res) {
      res.status.should.equal(201);
      res.body.should.have.property('_id');
      res.body.name.should.equal('Contact 99');
      done();
    });
  });

  // #3 delete a contact
  it('should delete contact', function(done) {
    const superserver = supertest(app);
    superserver
    .get('/api/contacts')
    .expect('Content-type', /json/)
    .expect(200) // This is HTTP response
    .end(function(err, res) {
// console.log('outputting returned contacts: ' + res.body);
        const id = res.body[0]._id;
        superserver
            .delete('/api/contacts/'+id)
            .expect('Content-type', /json/)
            .expect(200) // This is HTTP response
            .end(function(err, res) {
              res.status.should.equal(204);
              done();
            });
           }
         );
    });
});
