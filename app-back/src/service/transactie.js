const { getLogger } = require('../core/logging');
let { LOGGINGS } = require('../data/mock-data');
const transactieRepository = require('../repository/transactie');

const getAll = async (limit) => {
  const items = await transactieRepository.findAll().find().sort({ timestamp: -1 }).limit(limit);
  return {
    items,
    count: items.length,
  };
};

const create = ({ user, project, fase, notities, kilometers, factureerbaar,facturatiemethode }) => {
  if (typeof user === 'string') {
    user = { id: Math.floor(Math.random() * 100000), name: user };
  }
  else
  {
    getLogger().error('user is not a string');
  }
  const maxId = Math.max(...LOGGINGS.map((i) => i.id));
  const newLog = {
    id: maxId + 1,
    user,
    datum: date.toISOString(),
    project ,
    fase,
    notities,
    kilometers,
    factureerbaar,
    facturatiemethode,
  };

  LOGGINGS.push(newLog);
  return newLog;


};

module.exports = { getAll, create };