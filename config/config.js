const config = {}

config.development = {
  port: 9000,
  db: {
    username: process.env.RDS_USERNAME || "root",
    password: process.env.RDS_PASSWORD || "ljj104jjj910!",
    database: process.env.DATA_BASE || "duqin",
    host: process.env.RDS_HOST || "127.0.0.1",
    port: process.env.RDS_PORT || 3306,
    dialect: "mysql",
    logging: false,
    operatorsAliases: false,
  },
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      // password: '123456',
      retryStrategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          // End reconnecting on a specific error and flush all commands with a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.max(options.attempt * 100, 3000);
      }
    }
  }
}

config.production = Object.assign({}, config.development)

const env  = process.env.NODE_ENV || 'development';

export default config[env]