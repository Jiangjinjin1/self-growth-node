import Koa from "koa";
import isEmpty from "lodash/isEmpty";
import { responseCodeEnum } from "../code/responseCodeEnum";
import VideoInfoService from "../services/videoInfoService";

interface SongParamType {
  page: string | number;
  pageSize: number;
}

class SongInfoController {
  static async getList(ctx: Koa.Context) {
    const body = ctx.request.body;
    const params: SongParamType = {
      page: body.page,
      pageSize: body.pageSize,
    };

    const data = await VideoInfoService.getList(params);
    ctx.body = {
      code: responseCodeEnum.success.code,
      msg: responseCodeEnum.success.desc,
      data,
    };
  }

  static async getInfo(ctx: Koa.Context): Promise<any> {
    const id: any = ctx.query.id;
    const userInfo = await VideoInfoService.getInfo(id);
    if (!id) {
      ctx.body = {
        code: responseCodeEnum.normalError.code,
        msg: responseCodeEnum.normalError.desc,
        data: null,
      };
    } else if (isEmpty(userInfo)) {
      ctx.body = {
        code: responseCodeEnum.success.code,
        msg: "未查询到该用户信息",
        data: userInfo,
      };
    } else if (!isEmpty(userInfo)) {
      ctx.body = {
        code: responseCodeEnum.success.code,
        msg: responseCodeEnum.success.desc,
        data: userInfo,
      };
    }
  }
}

export default SongInfoController;
