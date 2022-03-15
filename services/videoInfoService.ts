import models from "../models";
import { Op } from "sequelize";

class VideoInfoService {
  static async getList(options: any) {
    const { page = 1, pageSize = 10 } = options || {};
    const result = await models.Video.findAndCountAll({
      include: "userInfo",
      offset: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    return result || {};
  }

  static async getInfo(id: number | string) {
    const songInfo = await models.Video.findOne({
      include: "userInfo",
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    return songInfo || {};
  }
}

export default VideoInfoService;
