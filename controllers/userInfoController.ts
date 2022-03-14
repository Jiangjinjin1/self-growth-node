import Koa from "koa";
import { responseCodeEnum } from "../code/responseCodeEnum";
import { UserInfoType } from "../types/types";
import UserInfoService from "../services/userInfoService";

class UserInfoController {
  // 根据type类型获取用户列表
  static async getUserList(ctx: Koa.Context) {
    const params: UserInfoType | any = {
      page: ctx.query.page,
      pageSize: ctx.query.pageSize,
      type: ctx.query.type,
    };

    if (params.type) {
      const result = await UserInfoService.getUserList(params);

      ctx.body = {
        code: responseCodeEnum.success.code,
        msg: responseCodeEnum.success.desc,
        data: result || [],
      };
    } else {
      ctx.body = {
        code: responseCodeEnum.normalError.code,
        msg: responseCodeEnum.normalError.desc,
        data: [],
      };
    }
  }
}

export default UserInfoController;
