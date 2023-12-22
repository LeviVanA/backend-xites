const {
  tables,
  getKnex
} = require('../data/index');

const getDienstIdByName = async (dienstName) => {
  const dienst = await getKnex()(tables.dienst)
    .select('id')
    .where('soortDienst', dienstName)
    .first();

  if (!dienst) {
    throw new Error(`Dienst '${dienstName}' not found.`);
  }

  return dienst.id;
};



module.exports = {
  getDienstIdByName,
};