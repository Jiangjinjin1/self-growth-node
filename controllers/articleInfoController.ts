import Koa from "koa";
import isEmpty from "lodash/isEmpty";
import { responseCodeEnum } from "../code/responseCodeEnum";
import ArticleInfoService from "../services/articleInfoService";

interface SongParamType {
  page: string | number;
  pageSize: number;
}

class ArticleInfoController {
  static async getList(ctx: Koa.Context) {
    const body = ctx.request.body;
    const params: SongParamType = {
      page: body.page,
      pageSize: body.pageSize,
    };

    const { count, rows } = await ArticleInfoService.getList(params);
    ctx.body = {
      code: responseCodeEnum.success.code,
      msg: responseCodeEnum.success.desc,
      data: {
        totals: count || 0,
        list: rows || [],
      },
    };
  }

  static async getInfo(ctx: Koa.Context): Promise<any> {
    const id: any = ctx.query.id;
    const userInfo = await ArticleInfoService.getInfo(id);
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

export default ArticleInfoController;
