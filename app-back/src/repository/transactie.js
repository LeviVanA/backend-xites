const {
  tables,
  getKnex
} = require('../data/index');
const {
  getLogger
} = require('../core/logging');

const SELECT_COLUMNS = [
  `${tables.logging}.id`, 'date', `${tables.user}.naam as naamUser`, `${tables.project}.naam`,
];

const findAll = () => {
  return getKnex()(tables.logging)
    .select(SELECT_COLUMNS)
    .join(tables.project, `${tables.logging}.projectId`, '=', `${tables.project}.id`)
    .join(tables.user, `${tables.logging}.userId`, '=', `${tables.user}.id`)
    .orderBy('date', 'ASC');
};

const create = async (user,{
  date,
  dienstId,
  projectId,
  beschrijving,
  kilometers,
  factureerbaar,
  tijdsduur,
  teControleren,
}) => {
  const logger = getLogger();
  try {
    logger.info(id)
    const [id] = await getKnex()(tables.logging)
      .insert({
        date,
        factureerbaar,
        projectId,
        dienstId,
        teControleren,
        tijdsduur,
        kilometers,
        beschrijving,
        userId: user.id,
      });
    console.log(tables.logging)
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