const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const COGNITO_JWKS_URL = "https://cognito-idp.ap-southeast-2.amazonaws.com/ap-southeast-2_Tmo0WoyLF/.well-known/jwks.json";

const client = jwksClient({
  jwksUri: COGNITO_JWKS_URL
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}


const validateJwt = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("Public request")
    //return res.status(401).send('Unauthorized');
    return next();
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(401).send('Unauthorized');
    }
    console.log('Decoded JWT Payload:', decoded);
    req.user = decoded;
    next();
  });
};



module.exports = validateJwt;
