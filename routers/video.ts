import Router from "koa-router";
import VideoInfoController from "../controllers/videoInfoController";

const router = new Router();

// @ts-ignore
// 获取视频信息列表
router.post("/getVideoList", VideoInfoController.getList);
// @ts-ignore
// 获取视频信息
router.get("/getVideoInfo", VideoInfoController.getInfo);

export default router;
