// alias配置
require("module-alias/register");
import Koa from "koa";
import convert from "koa-convert";
import koaLogger from "koa-logger";
import bodyParser from "koa-bodyparser";
import session from "koa-generic-session";
import redisStore from "koa-redis";
import views from "koa-views";
import koaStatic from "koa-static";
import path from "path";
import log4js from "@/server/utils/Log4jsUtil";
import config from "@/config/config";
import routers from "@/server/routers";

const app = new Koa();

const log = log4js.getLogger("cps:app");

log.debug("app start----");

app.keys = ["keys", "keykeys"];
app.use(
  session({
    // @ts-ignore
    store: redisStore(config.redis.default),
  })
);

// 配置控制台日志中间件
app.use(convert(koaLogger()));
// 配置ctx.body解析中间件
app.use(bodyParser());

// 配置静态资源加载中间件
app.use(convert(koaStatic(path.join(__dirname, "./static"))));

app.use(
  views(path.join(__dirname, "./server/views"), {
    extension: "ejs",
  })
);

// app.use(async (ctx) => {
//   let title = "hello koa2";
//   await ctx.render("index", {
//     title,
//   });
// });

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(config.port);
