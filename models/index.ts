import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import safeGet from "lodash/get";
import { IPlainObjectModal } from "../types/types";
// @ts-ignore
import log4js from "@utils/Log4jsUtil";

const log = log4js.getLogger("cps:model-index");

const configInfo = require("../config/config") || {};
const config = safeGet(configInfo, "db", {});
const db: IPlainObjectModal | any = {};
const basename = path.basename(__filename);

// @ts-ignore
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

log.debug(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
