const {
    tables
} = require('../index');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.dienst, (table) => {
            table.increments('id').unique();

            table.string('soortDienst', 255)
                .notNullable();

        });

    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.dienst);
    },
};