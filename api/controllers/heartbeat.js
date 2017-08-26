'use strict';

let util = require('util');

function sendOk(req, res) {
    res.json({message: util.format('OK')});
}

module.exports = {
    ok: sendOk
}