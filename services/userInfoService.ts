import { Op } from "sequelize";
import models from "../models";
import { UserInfoType } from "../types/types";

class UserInfoService {
  static async getList(options: UserInfoType) {
    const { page = 1, pageSize = 10, type = "" } = options || {};

    const result = await models.User.findAndCountAll({
      where: {
        type: {
          [Op.eq]: type,
        },
      },
      offset: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });
    return result || {};
  }

  static async getInfo(id: number | string) {
    const userInfo = await models.User.findOne({
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return userInfo || {};
  }
}

export default UserInfoService;
