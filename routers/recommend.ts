import Router from "koa-router";
import RecommendController from "../controllers/recommendController";

const router = new Router();

// @ts-ignore
// 获取推荐信息列表
router.post("/getRecommendList", RecommendController.getList);

export default router;
