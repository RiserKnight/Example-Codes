const Sequelize = require('sequelize');
 
  const sequelize = require('../singleton/sequelize-singleton');
 
  /**
   * Sessions table is used to store user session persistently.
   * 
   *
   * Read more on https://www.npmjs.com/package/connect-session-sequelize
   */
  const mappings = {
    sid: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000),
  };
 
  const Session = sequelize.define('Session', mappings, {
    indexes: [
      {
        name: 'session_sid_index',
        method: 'BTREE',
        fields: ['sid'],
      },
    ],
  });
 
  exports.getMapping = () => mappings;
 
  exports.getModel = () => Session;