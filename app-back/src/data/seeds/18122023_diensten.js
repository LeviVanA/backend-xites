const { tables } = require('..');

module.exports = {
  
  seed: async (knex) => {
    
    await knex(tables.dienst).delete();

    
    await knex(tables.dienst).insert([
      { id: 1, soortDienst: 'Website'},
      { id: 2, soortDienst: 'Hosting'},
      { id: 3, soortDienst: 'Webshop'},
    ]); 
  },
};