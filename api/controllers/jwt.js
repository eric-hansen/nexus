'use strict';

let jwt = require('../helpers/jwt');

function _fetch(req, res, next) {
    let user = req.body.username;
    let pass = req.body.password;

    jwt.sign({sub: user, exp: jwt.generateExpiration()}, 'BOB DENVER').then(function(tokenObject) {
        res.writeHead(200, {'Content-Type': 'application/json'});
    
    
        res.end(JSON.stringify({token: tokenObject.token, id: user}));

        next();
    });
}

function _validate(req, res, next) {
    res.end(JSON.stringify({}));
}

module.exports = {
    fetch: _fetch,
    validate: _validate
};