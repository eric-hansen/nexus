'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();

let jsonwebtoken = require('jsonwebtoken');
let jwt = require('./api/helpers/jwt');

/**
 * Enable CORS
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  next();
});

// @TODO: Move this to a config/*.json file
const JWT_SECRET = '....................';

module.exports = app; // for testing

var config = {
  appRoot: __dirname, // required config
  swaggerSecurityHandlers: {
    Bearer: function (req, authOrSecDef, jwtToken, cb) {

      req.res.setHeader('Content-Type', 'application/json');

      if (jwtToken && jwtToken.indexOf('Bearer ') === 0) {
        jwtToken = jwtToken.split(' ')[1];

        jwt.verify(jwtToken, JWT_SECRET).then(function(res) {
          // Successful
          return cb();
        }).catch(function (err) {
          return cb(new Error((process.env.NODE_ENV == 'dev' ? err : err.message)));
        });
      } else {
        return cb(new Error('Missing properly formatted Authorization header'));
      }
    }
  }
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'dev';

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  console.log('Running Nexus in '+process.env.NODE_ENV+' mode.');

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
