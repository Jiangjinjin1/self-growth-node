const config = {}

config.development = {
  port: 9000,
  db: {
    username: process.env.RDS_USERNAME || "root",
    password: process.env.RDS_PASSWORD || "123456",
    database: process.env.DATA_BASE || "duqin",
    host: process.env.RDS_HOST || "127.0.0.1",
    port: process.env.RDS_PORT || 3306,
    dialect: "mysql",
    logging: false,
    // operatorsAliases: false,
  },
  redis: {
    default: {
      host: "127.0.0.1",
      port: 6379,
      // password: '123456',
    }
  }
}

config.production = Object.assign({}, config.development)

const env  = process.env.NODE_ENV || 'development';

module.exports = config[env]