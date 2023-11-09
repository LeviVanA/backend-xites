const { tables, getKnex } = require('../data/index'); 
const { getLogger } = require('../core/logging');

//TODO: samenvoegen all tables
const formatTransaction = ({
  user_id,
  user_name,
  ...rest
}) => ({
  ...rest,
  user: {
    id: user_id,
    name: user_name,
  },
});

const findAll = () => {
  //TODO: samenvoegen all tables
  return getKnex()(tables) 
    .select()
    .orderBy('name', 'ASC')
    .then(rows => rows.map(formatTransaction));
};

const create = async ({
  user, project, fase, notities, kilometers, factureerbaar,facturatiemethode
}) => {
  const logger = getLogger();
  try {
    logger.info(id)
    const [id] = await getKnex()(tables)//TODO
      .insert({
        user_id: user.id,
        project,
        fase,
        notities,
        kilometers,
        factureerbaar,
        facturatiemethode,
      });
    console.log(tables)//TODO
    return id;
  } catch (error) {
    
    logger.error('Error in create', {
      error,
    });
    throw error;
  }
};

module.exports = {
  findAll,
  create,
};