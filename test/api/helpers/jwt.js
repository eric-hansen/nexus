var should = require('should');
var request = require('supertest');
var server = require('../../../app');

var jwt = require('../../../api/helpers/jwt');

describe('helpers::jwt', function() {

    describe('sign()', function() {

      it('should return a token', function(done) {

        jwt.sign('some paload', 'SECRET TIME').then(function (tokenObject) {
            tokenObject.should.have.property('token');

            done();
        });

      });

    });

    describe('verify()', function () {

        it('should return the data', function (done) {

            jwt.sign('some payload', 'SECRET TIME').then(function (tokenObject) {
                jwt.verify(tokenObject.token, 'SECRET TIME').then(function (result) {

                    result.should.have.property('data');
                    result.data.should.eql('some payload');

                    done();
                });
            });
        });

        it('should not verify an expired token', function (done) {

            jwt.sign({msg: 'some payload', exp: 0}, 'SECRET').then(function (tokenObject) {
                jwt.verify(tokenObject.token, 'SECRET').catch(function (res) {
                    res.should.have.property('message');
                    res.message.should.eql('jwt expired');
                    
                    done();
                });
            });
        });
    });

});
