const Router = require('@koa/router');
const installTransactionRouter = require('./_transactie');
const installHealthRouter = require('./_health');
const installUserRouter = require("./_user");
const installProjectRouter = require("./_project");
const installDienstRouter = require("./_dienst");


module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installTransactionRouter(router);
  installHealthRouter(router);
  installUserRouter(router);
  installProjectRouter(router);
  installDienstRouter(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};