const {
    tables
  } = require('../index');
  
  module.exports = {
    seed: async (knex) => {
      // first delete all entries in every table
      await knex(tables.dienst).delete();
      await knex(tables.project).delete();
      await knex(tables.logging).delete();
      await knex(tables.user).delete();
    },
  };