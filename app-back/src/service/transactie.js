const {
  getLogger
} = require('../core/logging');
let {
  LOGGINGS
} = require('../data/mock-data');
const transactieRepository = require('../repository/transactie');
const ServiceError = require('../core/serviceError');
const handleDBError = require('./handleDBError');
const {
  getDienstIdByName
} = require('../repository/dienst');
const {
  getProjectIdByName
} = require('../repository/project');

const getAll = async (limit) => {
  const items = await transactieRepository.findAll()//.limit(limit);
  return {
    items,
    count: items.length,
  };
};

const create = async ({
  dienst,
  project,
  beschrijving,
  kilometers,
  factureerbaar,
  tijdsduur,
  date,
  userId,

}) => {
  const dienstId = await getDienstIdByName(dienst);
  const projectId = await getProjectIdByName(project);

  const maxId = Math.max(...LOGGINGS.map((i) => i.id));
  const newLog = {
    id: maxId + 1,
    date: date.toISOString(),
    dienstId,
    userId,
    projectId,
    beschrijving,
    kilometers,
    factureerbaar,
    tijdsduur,
    teControleren,
  };

  LOGGINGS.push(newLog);
  const id = await transactieRepository.create({
    date,
    dienstId,
    userId,
    projectId,
    beschrijving,
    kilometers,
    factureerbaar,
    tijdsduur,
    teControleren,
  });
  return newLog;


};

module.exports = {
  getAll,
  create
};