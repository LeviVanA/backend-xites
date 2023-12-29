const {
  tables,
  getKnex,
} = require('../data');
const {
  getLogger,
} = require('../core/logging');


async function findById(id) {
  const user = await getKnex()(tables.user).where('id', id).first();
  return user;
}
async function findByName(name) {
  const user = await getKnex()(tables.user).where('name', name).first();
  return user;
}


async function create({
  name,
  salt,
  hash,
}) {
  // is there a better way to catch a duplicate error?
  const existingUser = await findByName(name);
  if (existingUser !== undefined) {
    const error = new Error('DUPLICATE_ENTRY');
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
  try {
    const [id] = await getKnex()(tables.user).insert({
      name,
      salt,
      hash, 
    });
    return findById(id);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
}

/**
 * Update a user with the given `id`.
 *
 * @param {number} id - Id of the user to update.
 * @param {object} user - User to save.
 * @param {string} user.name - Name of the user.
 *
 * @returns {Promise<number>} - Id of the updated user.
 */
const updateById = async (id, {
  name,
  role,
}) => {
  try {
    await getKnex()(tables.user)
      .update({
        name,
        role,

      })
      .where('id', id);
    return id;
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in updateById', {
      error,
    });
    throw error;
  }
};


const getAllEmployees = async (companyId) => {
  try {
    const employees = await getKnex()(tables.user)
      .select()
      .where('companyId', companyId);
    return employees.map(formatUser);
  } catch (error) {
    const logger = getLogger();
    logger.error('Error in getAllEmployees', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findById,
  findByName,
  updateById,
  getAllEmployees,
  create,
};