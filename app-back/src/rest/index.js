const Router = require('@koa/router');
const installTransactionRouter = require('./_transactie');
const installHealthRouter = require('./_health');


module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installTransactionRouter(router);
  installHealthRouter(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};