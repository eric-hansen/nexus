var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers::heartbeat', function() {

    describe('GET /heartbeat', function() {

      it('should return OK', function(done) {

        request(server)
          .get('/heartbeat')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.have.property('message');
            res.body.message.should.eql('OK');

            done();
          });
      });

    });

});
