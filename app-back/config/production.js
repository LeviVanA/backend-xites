module.exports = {
  log: {
    level: 'info',
    disabled: false,
  },
  cors: { 
    origins: ['*'], 
    maxAge: 3 * 60 * 60, 
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
