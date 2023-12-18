const Router = require('@koa/router');
const transactionService = require('../service/transactie');

const getAllTransactions = async (ctx) => {
  const limit = 100;
  ctx.body = transactionService.getAll(limit);
};

const createTransaction = async (ctx) => {
  const newTransaction = transactionService.create({
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newTransaction;
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/transactions',
  });

  router.get('/', getAllTransactions);
  router.post('/', createTransaction);

  app.use(router.routes())
     .use(router.allowedMethods());
};
