import Router from "koa-router";
import SongInfoController from "../controllers/songInfoController";

const router = new Router();

// @ts-ignore
// 获取歌曲信息列表
router.post("/getSongList", SongInfoController.getList);
// @ts-ignore
// 获取用户信息信息
router.get("/getSongInfo", SongInfoController.getInfo);

export default router;
