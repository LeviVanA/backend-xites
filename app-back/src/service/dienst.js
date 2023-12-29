const {
    getLogger
  } = require('../core/logging');

  const {
    getAllDiensten
  } = require('../repository/dienst');

  const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getLogger();
    this.logger.debug(message, meta);
  };
  
  
  const getAll = async () => {
    const items = await getAllDiensten();
    debugLog(`All diensten ${items}`);
    return 
      items
  };
  module.exports = {
    getAll
  };