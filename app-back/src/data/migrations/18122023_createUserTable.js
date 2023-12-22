const {
    tables
} = require('../index');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.user, (table) => {
            table.increments('id').unique();

            table.string('naam', 255)
                .notNullable();

            table.string('password_hash').notNullable();
            
            table.jsonb('roles').notNullable();

        });

    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.user);
    },
};