module.exports = {
  port: 9000,
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: { 
    origins: ['*'], 
    maxAge: 3 * 60 * 60, 
  },
  database: {
    client: 'mysql2',
    host: 'localhost',
    port: 3306,
    name: 'xites',
  },
  auth: {
    argon: {
      saltLength: 16,
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
  },
};
