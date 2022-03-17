import Koa from "koa";
import { responseCodeEnum } from "../code/responseCodeEnum";
import { UserInfoType } from "../types/types";
import UserInfoService from "../services/userInfoService";
import isEmpty from "lodash/isEmpty";

class UserInfoController {
  // 根据type类型获取用户列表
  static async getList(ctx: Koa.Context): Promise<any> {
    const body = ctx.request.body;

    const params: UserInfoType | any = {
      page: body.page,
      pageSize: body.pageSize,
      type: body.type,
    };

    if (params.type) {
      const data = await UserInfoService.getList(params);
      ctx.body = {
        code: responseCodeEnum.success.code,
        msg: responseCodeEnum.success.desc,
        data,
      };
    } else {
      ctx.body = {
        code: responseCodeEnum.normalError.code,
        msg: responseCodeEnum.normalError.desc,
        data: null,
      };
    }
  }

  static async getInfo(ctx: Koa.Context): Promise<any> {
    const id: any = ctx.query.id;
    const userInfo = await UserInfoService.getInfo(id);
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

export default UserInfoController;
