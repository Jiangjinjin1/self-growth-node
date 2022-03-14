import Koa from "koa";
import Router from "koa-router";

const router = new Router();

router.get("/", (ctx) => {
  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `;
  ctx.body = html;
});

export default router;
