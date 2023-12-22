const {
    tables,
    getKnex
} = require('../data/index');

const create = async ({
    name,
    email,
    passwordHash,
    roles,
}) => {
    try {
        const [id] = await getKnex()(tables.user).insert({
            id,
            name,
            email,
            password_hash: passwordHash,
            roles: JSON.stringify(roles),
        });
        return id;
    } catch (error) {
        getLogger().error('Error in create', {
            error,
        });
        throw error;
    }
};

module.exports = {
    create,
};