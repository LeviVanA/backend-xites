let { LOGGINGS } = require('../data/mock-data');

const getAll = () => {
  return { items: LOGGINGS, count: LOGGINGS.length };
};

const create = ({ user, project, fase, notities, kilometers, factureerbaar,facturatiemethode }) => {
  if (typeof user === 'string') {
    user = { id: Math.floor(Math.random() * 100000), name: user };
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