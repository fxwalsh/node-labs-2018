import supertest from 'supertest';
import {app} from './../index.js';
import should from 'should'; // eslint-disable-line
// UNIT test begin
describe('Hacker News Posts API unit test', function() {
  this.timeout(120000); // eslint-disable-line
  // #1 return a collection of json documents
  it('should return collection of all Posts as JSON documents', function(done) {
    supertest(app)
    .get('/api/posts')
    .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M')
    .expect('Content-type', /json/)
    .expect(200) // This is the HTTP response
    .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
    });
  });

  it('should deny access', function(done) {
    supertest(app)
    .get('/api/posts')
    .expect('Content-type', /json/)
    .expect(401) // This is the HTTP response
    .end(function(err, res) {
        // HTTP status should be 401
        res.status.should.equal(401);
        done();
    });
  });

  // #1 return a collection of json documents
  it('should add a post', function(done) {
    // calling home page api
    supertest(app)
    .post('/api/posts')
    .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M')
    .send({title: 'A new Title', link: 'http://alink'})
    .expect('Content-type', /json/)
    .expect(201) // This is the HTTP response
    .end(function(err, res) {
        // HTTP status should be 200
        res.status.should.equal(201);
        done();
    });
  });

  // #1 return a collection of json documents
  it('should get a post', function(done) {
    // calling home page api
    supertest(app)
    .get('/api/posts')
    .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M')
    .expect('Content-type', /json/)
    .expect(200) // This is the HTTP response
    .end(function(err, res) {
      const id = res.body[0]._id;
      supertest(app)
          .get('/api/posts/'+id)
          .set('Authorization', 'BEARER eyJhbGciOiJIUzI1NiJ9.dXNlcjE.FmYria8wq0aFDHnzYWhKQrhF5BkJbFNN1PqNyNQ7V4M')
          .expect('Content-type', /json/)
          .expect(200) // This is HTTP response
          .end(function(err, res) {
            res.status.should.equal(200);
            res.body.should.have.property('post');
            res.body.post.title.should.equal('A new Title');
            done();
          });
    });
  });
});
