import Router from "koa-router";
import UserInfoController from "../controllers/userInfoController";

const router = new Router();

// @ts-ignore
// 获取用户信息列表
router.post("/getUserList", UserInfoController.getList);
// @ts-ignore
// 获取用户信息
router.get("/getUserInfo", UserInfoController.getInfo);

export default router;
