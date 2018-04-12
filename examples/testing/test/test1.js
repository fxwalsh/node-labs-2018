import should from 'should';

const user = {
    name: 'tj',
    pets: ['tobi', 'fred', 'fido', 'tiddler']
};

user.should.have.property('name','tj');
user.should.have.property('pets').with.lengthOf(4); 

