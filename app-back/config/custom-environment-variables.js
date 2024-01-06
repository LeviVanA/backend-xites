module.exports = {
  env: 'NODE_ENV',
  port: 'PORT',
  database: {
    client: 'DATABASE_CLIENT',
    host: 'DATABASE_HOST',
    port: 'DATABASE_PORT',
    username: 'DATABASE_USERNAME',
    password: 'DATABASE_PASSWORD',
    name: 'DATABASE_NAME,'
  },
  auth: {
    jwksUri: 'AUTH_JWKS_URI',
    authAudience: 'AUTH_AUDIENCE',
    issuer: 'AUTH_ISSUER',
    userInfo: 'AUTH_USER_INFO',
    tokenUrl: 'AUTH_TOKEN_URL',
    clientId: 'AUTH_CLIENT_ID',
    clientSecret: 'AUTH_SECRET',
    
  }
};