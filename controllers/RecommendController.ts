import Koa from "koa";
import isEmpty from "lodash/isEmpty";
import { responseCodeEnum } from "../code/responseCodeEnum";
import RecommendService from "../services/recommendService";

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

    const list = await RecommendService.getList(params);
    ctx.body = {
      code: responseCodeEnum.success.code,
      msg: responseCodeEnum.success.desc,
      data: list || [],
    };
  }
}

export default ArticleInfoController;
