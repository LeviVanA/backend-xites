const {
    tables,
} = require('../index');

module.exports = {
    seed: async (knex) => {
        await knex(tables.user).insert([{
                id: 1,
                naam: 'Levi Van Achter',
                password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify(['user', 'admin']),
                auth0id: 'unknown',
            },
            {
                id: 2,
                naam: 'Daan Van Landuyt',
                password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify(['user']),
                auth0id: 'auth0|632ee656ee00e7cb2b01b9b4',
            },
            {
                id: 3,
                naam: 'testuser',
                password_hash: '$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4',
                roles: JSON.stringify(['user']),
                auth0id: 'unknown',
            },
        ]);
    },
};