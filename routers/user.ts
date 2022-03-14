import Router from "koa-router";
import UserInfoController from "../controllers/userInfoController";

const router = new Router();

// @ts-ignore
router.get("/getUserList", UserInfoController.getUserList);

export default router;
