const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if ( !authHeader ) {
    return res.status(401).json( {message: 'Not Authorized'} );
  }

  const token = authHeader.split(' ')[1];
  if( !token ) {
    res.statud(401).json( { message: 'Not Authorized' } );
  }

  try {
    const decoded = jwt.verify( token.process.env.JWT_SECRET );
    req.user = decoded;
    next();
  } catch ( err ) {
    return res.status(401).json( {message: 'Token invalid or expired'} );
  }
}
