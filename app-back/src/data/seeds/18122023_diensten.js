const { tables } = require('..');

module.exports = {
  
  seed: async (knex) => {
    
    await knex(tables.dienst).delete();

    
    await knex(tables.dienst).insert([
      { id: 1, naam: 'Website'},
      { id: 2, naam: 'Hosting'},
      { id: 3, naam: 'Webshop'},
    ]); 
  },
};