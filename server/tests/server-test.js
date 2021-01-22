process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('SecretServer', () => {
  let server;
  beforeEach(() => {
    server = require('../app');
  });
  afterEach(() => {
    server.close()
  });
  it('should return a 200 HTTP Code', (done) => {
    chai.request(server).get('/api/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;

        const { body } = res;
        body.should.be.a('object');
        body.msg.should.be.a('string');
        body.should.have.property('msg');
        done();
      })
  });
});
