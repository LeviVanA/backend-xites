const {
    tables
} = require('../index');

module.exports = {
    up: async (knex) => {
        await knex.schema.createTable(tables.logging, (table) => {
            table.increments('id').unique();

            table.dateTime('date')
                .notNullable();

            table.boolean('factureerbaar')
                .notNullable();

            table.integer('projectId').unsigned().notNullable();

            table.foreign('projectId', 'fk_Logging_Project').references(`${tables.project}.id`);

            table.integer('dienstId').unsigned().notNullable();

            table.foreign('dienstId', 'fk_Logging_Dienst').references(`${tables.dienst}.id`);

            table.boolean('teControleren')
                .notNullable();

            table.string('tijdsduur', 255)
                .notNullable();

            table.string('kilomters')
                .notNullable();

            table.string('beschrijving', 255)
                .notNullable();

            table.integer('userId').unsigned().notNullable();
            table.foreign('userId', 'fk_Logging_User').references(`${tables.user}.id`).onDelete('CASCADE');

        });

    },
    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.logging);
    },
};