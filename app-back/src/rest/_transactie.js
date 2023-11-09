const Router = require('@koa/router');
const transactionService = require('../service/transactie');

const getAllTransactions = async (ctx) => {
  ctx.body = transactionService.getAll();
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
