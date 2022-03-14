import { Op } from "sequelize";
import models from "../models";
import { UserInfoType } from "../types/types";

class UserInfoService {
  static async getUserList(options: UserInfoType) {
    const { page = 1, pageSize = 10, type = "" } = options || {};
    console.log(Number(pageSize));
    console.log((Number(page) - 1) * Number(pageSize));

    try {
      const result = await models.User.findAndCountAll({
        where: {
          type: {
            [Op.eq]: type,
          },
        },
        offset: (Number(page) - 1) * Number(pageSize),
        limit: Number(pageSize),
      });
      return result || [];
    } catch (e) {
      throw e;
    }
  }
}

export default UserInfoService;
