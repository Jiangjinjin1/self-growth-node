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
import log4js from "./utils/Log4jsUtil";
import config from "./config/config";
import routers from "./routers";

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

// 打印请求参数
app.use(async (ctx: Koa.Context, next: Function) => {
  const query = ctx.query;
  const body = ctx.request.body;

  log.info(
    `request-query: ${JSON.stringify(query)}::::request-body:${JSON.stringify(
      body
    )}`
  );
  await next();
});

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
// @ts-ignore
routers.routing(app);

app.listen(config.port);
