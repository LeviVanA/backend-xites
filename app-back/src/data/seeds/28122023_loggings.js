const {
    tables
} = require('..');

module.exports = {

    seed: async (knex) => {

        await knex(tables.logging).delete();


        await knex(tables.logging).insert([{
                id: 1,
                date: new Date(2021, 4, 25),
                factureerbaar: true,
                projectId: 1,
                dienstId: 1,
                teControleren: true,
                tijdsduur: "4",
                kilometers: "5",
                beschrijving: 'test',
                userId: 1,

            },
            {
                id: 2,
                date: new Date(2021, 4, 27),
                factureerbaar: true,
                projectId: 3,
                dienstId: 3,
                teControleren: true,
                tijdsduur: "4",
                kilometers: "5",
                beschrijving: 'test',
                userId: 2,
            },
            {
                id: 3,
                date: new Date(2021, 4, 29),
                factureerbaar: true,
                projectId: 1,
                dienstId: 2,
                teControleren: true,
                tijdsduur: "4",
                kilometers: "5",
                beschrijving: 'test',
                userId: 3,
            },
        ]);
    },
};