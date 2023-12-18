const { tables } = require('..');

module.exports = {
  
  seed: async (knex) => {
    
    await knex(tables.project).delete();

    
    await knex(tables.project).insert([
      { id: 1, naam: 'bedrijf 1'},
      { id: 2, naam: 'bedrijf 2'},
      { id: 3, naam: 'bedrijf 3'},
    ]); 
  },
};