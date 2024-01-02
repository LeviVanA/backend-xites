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
const userService = require('./user');

const getAll = async (limit) => {
  const items = await transactieRepository.findAll() //.limit(limit);
  //console.log(items)
  return {items: items,}

};

const create = async (token, {
  dienst,
  project,
  beschrijving,
  kilometers,
  factureerbaar,
  tijdsduur,
  teControleren,
  date,

}) => {
  const dienstId = await getDienstIdByName(dienst);
  const projectId = await getProjectIdByName(project);
  const user = await userService.getByToken(token);

  const maxId = Math.max(...LOGGINGS.map((i) => i.id));
  const newLog = {
    id: maxId + 1,
    date: date,
    dienstId,
    projectId,
    beschrijving,
    kilometers,
    factureerbaar,
    tijdsduur,
    teControleren,
  };

  LOGGINGS.push(newLog);
  const id = await transactieRepository.create(user, {
    date,
    dienstId,
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