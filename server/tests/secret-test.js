process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Secrets', () => {
  let server;
  beforeEach(() => {
    server = require('../app');
  });
  afterEach(() => {
    server.close()
  });
  it('should create a new secret', (done) => {
    chai.request(server).post('/api/secret')
      .send({
        "secret": "Here is a new secret",
        "expireAfter": new Date(),
        "expireAfterViews": 10
       })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;

        const { body } = res;
        body.should.be.a('object');
        body.should.have.property('hash')
        body.should.have.property('secretText');
        body.should.have.property('createdAt');
        body.should.have.property('expiresAt');
        body.should.have.property('remainingViews');

        /** Test response types  */
        body.hash.should.be.a('string');
        body.secretText.should.be.a('string');
        body.createdAt.should.be.a('string');
        body.expiresAt.should.be.a('string');
        body.remainingViews.should.be.a('number');
        done();
      })
  });
  it('must provide required fields', (done) => {
    chai.request(server).post('/api/secret')
      .send({
        "expireAfter": new Date(),
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;

        const { body } = res;
        body.should.be.a('object');
        body.should.have.property('msg')
        body.msg.should.be.a('string');
        done();
      })
  });
  it('should retrieve a secret', (done) => {
    chai.request(server).get('/api/secret/jafhdkjafhkjdfhkdjfkj')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;

        const { body } = res;
        body.should.be.a('object');
        body.should.have.property('hash')
        body.should.have.property('secretText');
        body.should.have.property('createdAt');
        body.should.have.property('expiresAt');
        body.should.have.property('remainingViews');

        /** Test response types  */
        body.hash.should.be.a('string');
        body.secretText.should.be.a('string');
        body.createdAt.should.be.a('string');
        body.expiresAt.should.be.a('string');
        body.remainingViews.should.be.a('number');
        done();
      })
  });
});
