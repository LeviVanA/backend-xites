const {
  getLogger
} = require('../core/logging');

const {
  getAllProjects
} = require('../repository/project');

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getLogger();
  this.logger.debug(message, meta);
};


const getAll = async () => {
  const items = await getAllProjects();
  debugLog(`All diensten ${items}`);
  return {items: items}
};
module.exports = {
  getAll
};