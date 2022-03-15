import models from "../models";
import { Op } from "sequelize";
import forEach from "lodash/forEach";
import { IPlainObject } from "../types/types";

interface OptionType {
  page: string | number;
  pageSize: number;
}

type RandomType = "userEntity" | "songEntity" | "articleEntity" | "videoEntity";
type InfoType = Record<string, object>;

class RecommendService {
  static async getList(options: OptionType) {
    const userList: object[] = await this.getUserList(options);
    const songList: object[] = await this.getSongList(options);
    const articleList: object[] = await this.getArticleList(options);
    const videoList: object[] = await this.getVideoList(options);

    const modelArr = ["user", "song", "article", "video"];
    const modelTypes = this.getRandomModelInfo(options.pageSize, modelArr);
    const listData: InfoType[] = [];

    forEach(modelTypes, (key, index) => {
      const tmpInfo: IPlainObject = {};
      switch (key) {
        case modelArr[0]:
          tmpInfo[`${key}Entity`] = userList[index]
            ? userList[index]
            : userList[Math.floor(Math.random() * (userList.length - 1))];
          listData.push(tmpInfo);
          break;
        case modelArr[1]:
          tmpInfo[`${key}Entity`] = songList[index]
            ? songList[index]
            : songList[Math.floor(Math.random() * (songList.length - 1))];
          listData.push(tmpInfo);
          break;
        case modelArr[2]:
          tmpInfo[`${key}Entity`] = articleList[index]
            ? articleList[index]
            : articleList[Math.floor(Math.random() * (articleList.length - 1))];
          listData.push(tmpInfo);
          break;
        case modelArr[3]:
          tmpInfo[`${key}Entity`] = videoList[index]
            ? videoList[index]
            : videoList[Math.floor(Math.random() * (videoList.length - 1))];
          listData.push(tmpInfo);
          break;
        default:
          break;
      }
    });

    return listData;
  }

  // 获取用户列表数据
  static async getUserList(options: OptionType): Promise<object[]> {
    const { page = 1, pageSize = 10 } = options || {};
    const { rows } = await models.User.findAndCountAll({
      offset: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });
    return rows || [];
  }

  // 获取歌曲列表数据
  static async getSongList(options: OptionType) {
    const { page = 1, pageSize = 10 } = options || {};
    const { rows } = await models.Song.findAndCountAll({
      include: "userInfo",
      offset: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    return rows || {};
  }

  // 获取文章列表数据
  static async getArticleList(options: OptionType) {
    const { page = 1, pageSize = 10 } = options || {};
    const { rows } = await models.Article.findAndCountAll({
      include: "userInfo",
      offset: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    return rows || {};
  }

  // 获取视频列表数据
  static async getVideoList(options: OptionType) {
    const { page = 1, pageSize = 10 } = options || {};
    const { rows } = await models.Video.findAndCountAll({
      include: "userInfo",
      offset: (Number(page) - 1) * Number(pageSize),
      limit: Number(pageSize),
    });

    return rows || {};
  }

  // 获取不同模型中的对应数据
  static getRandomModelInfo(pageSize: number, modelTypes: string[]) {
    let modelArr: string[] = [];
    for (let i = 0; i < pageSize; i++) {
      const index = Math.floor(Math.random() * (modelTypes.length - 1));
      modelArr.push(modelTypes[index]);
    }
    return modelArr;
  }
}

export default RecommendService;
