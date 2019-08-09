const server = require('../server/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

describe('server.js', function () {
  this.timeout(5000);
  beforeEach((done) => {

    done();
  });

  afterEach((done) => {
    done();
  })

  it('responds to /', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('responds to /projects', (done) => {
    chai.request(server)
      .get('/projects')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('responds to /contact', (done) => {
    chai.request(server)
      .get('/contact')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('responds to POST /thanks', (done) => {
    chai.request(server)
      .post('/thanks')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('GET / should contain HTML', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.text).to.contain('html');
        done();
      });
  });

  it('GET /projects should contain anchor element', (done) => {
    chai.request(server)
      .get('/projects')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.text).to.contain('<a');
        done();
      });
  });

  it('GET /contact should contain form element', (done) => {
    chai.request(server)
      .get('/contact')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.text).to.contain('<form');
        done();
      });
  });

  it('POST /thanks should contain html', (done) => {
    chai.request(server)
      .post('/thanks')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.text).to.contain('html');
        done();
      });
  });

})
