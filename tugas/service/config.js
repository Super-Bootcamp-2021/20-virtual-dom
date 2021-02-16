const rc = require('rc');

const defaultConfig = {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'dubnium',
  },
  minio: {
    endPoint: '127.0.0.1',
    port: 9000,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  },
  server: {
    port: {
      worker: 7001,
      task: 7002,
      performance: 7003,
    },
  },
};

const config = rc('tm', defaultConfig);

module.exports = {
  config,
};
