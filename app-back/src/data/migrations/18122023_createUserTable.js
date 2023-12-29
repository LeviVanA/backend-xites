const {
    tables
} = require('../index');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.user, (table) => {
            table.increments('id').unique();
            table.string('name', 255);
            table.string('role').defaultTo('employee'); //can be admin
            table.string('salt', 255)
                .notNullable()
                .unique();
            table.string('hash', 255)
                .notNullable()
                .unique();
        });

    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};