/**
 * mock server plugin for uba-server
 * Date : 2017-12-29 20:47:27
 */

const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const utils = require("./utils");

module.exports = (app, opt) => {
  let router = new Router();
  utils.loadMock(router,opt.file);
  // router.get("/api/user/:id", async(ctx) => {
  //   ctx.body = await utils.readMockFile("./entry.less");
  // });
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
}
