'use strict';

let jsonwebtoken = require('jsonwebtoken');

/**
 * Generate a JWT token.  Used when fetching a token.
 * 
 * @param {string} payload 
 * @param {string|Buffer|Object} secretOrPrivateKey 
 * @param {Object} options 
 */
function _sign(payload, secretOrPrivateKey, options) {
    return new Promise(function(resolve, reject) {
        try {
            jsonwebtoken.sign(payload, secretOrPrivateKey, options, function (err, token) {
                if (err) reject(err);
                else resolve({token: token});
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Ensure the token is not expired and has not been mangled with.
 * 
 * @param {string} token 
 * @param {string|Buffer|Object} secretOrPrivateKey 
 * @param {Object} options 
 */
function _verify(token, secretOrPrivateKey, options) {
    return new Promise(function(resolve, reject) {
        try {
            jsonwebtoken.verify(token, secretOrPrivateKey, options, function(err, result) {
                if (err) reject(err);
                else resolve({data: result});
            });
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Generate an expiration vlaue from now.  This has to exist as MS inside the token.
 * Defaults to 1 hour.
 * 
 * @param {integer} timeToLiveInSeconds 
 */
function _generateExpiration(timeToLiveInSeconds) {
    if (!timeToLiveInSeconds) timeToLiveInSeconds = 3600;
    
    return Math.floor(Date.now() / 1000) + timeToLiveInSeconds;
}

module.exports = {
    sign: _sign,
    verify: _verify,
    generateExpiration: _generateExpiration
};