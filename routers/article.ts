import Router from "koa-router";
import ArticleInfoController from "../controllers/articleInfoController";

const router = new Router();

// @ts-ignore
// 获取文章信息列表
router.post("/getArticleList", ArticleInfoController.getList);
// @ts-ignore
// 获取文章信息
router.get("/getArticleInfo", ArticleInfoController.getInfo);

export default router;
