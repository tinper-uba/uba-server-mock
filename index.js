/**
 * mock server plugin for uba-server
 * Date : 2018-01-02 14:33:12
 */

const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const utils = require("./utils");

module.exports = (app, opt) => {
  let router = new Router();
  utils.loadMock(router,opt.file);
  app.use(bodyParser());
  app.use(router.routes());
  app.use(router.allowedMethods());
}
