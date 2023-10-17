let { LOGGINGS } = require('../data/mock-data');

const getAll = () => {
  return { items: LOGGINGS, count: LOGGINGS.length };
};

const create = ({ user, datum, project, fase, notities, kilometers, factureerbaar,facturatiemethode }) => {
  throw new Error('Not implemented yet!');
};

module.exports = { create };