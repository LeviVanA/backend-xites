const {
    tables,
} = require('../index');

module.exports = {
    seed: async (knex) => {
        await knex(tables.user).insert([{
                id: 1,
                naam: 'Levi Van Achter',
                auth0id: 'unknown',
            },
            {
                id: 2,
                naam: 'Daan Van Landuyt',
                auth0id: 'auth0|632ee656ee00e7cb2b01b9b4',
            },
            {
                id: 3,
                naam: 'testuser',
                auth0id: 'unknown',
            },
        ]);
    },
};