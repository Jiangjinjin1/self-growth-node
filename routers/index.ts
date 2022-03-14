import Router from "koa-router";
import fs from "fs";
import path from "path";
import log4js from "@/utils/Log4jsUtil";

const routers = new Router();
const log = log4js.getLogger("cps:routers-index");

export default {
  routing(app: any) {
    const files = fs.readdirSync(__dirname);
    files.forEach((item) => {
      const routeBaseName = path.basename(item, ".ts");
      if (routeBaseName === "index") return;
      const route = require(path.resolve(__dirname, item)).default;
      log.debug(routeBaseName);

      routers.use(
        `/api/${routeBaseName}`,
        route.routes(),
        route.allowedMethods()
      );
      app.use(routers.routes()).use(routers.allowedMethods());
    });
  },
};
