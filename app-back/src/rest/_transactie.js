const Router = require('@koa/router');
const transactionService = require('../service/transactie');
const Joi = require('joi');
const validate = require('../core/validation');

const getAllTransactions = async (ctx) => {
  const limit = 100;
  ctx.body = transactionService.getAll(limit);
};
getAllTransactions.validationScheme = null;

const createTransaction = async (ctx) => {
  let userId = 0;
  try {
    const user = await userService.getByAuth0Id(ctx.state.user.sub);
    userId = user.id;

  } catch (err) {
    await addUserInfo(ctx);
    userId = await userService.register({
      auth0id: ctx.state.user.sub,
      naam: ctx.state.user.name,
    });
  }

  const newTransaction = transactionService.create({
    ...ctx.request.body,
    date: new Date(ctx.request.body.date),
    userId,
  });
  ctx.body = newTransaction;
};
createTransaction.validationScheme = {
  body: {
    amount: Joi.number().invalid(0),
    date: Joi.date().iso().less('now'),
    dienstId: Joi.number().integer().positive(),
    projectId: Joi.number().integer().positive(),
    kilometers: Joi.number().integer().positive(),
    userId: Joi.number().integer().positive(),
  },
};

module.exports = (app) => {
  const router = new Router({
    prefix: '/transactions',
  });

  router.get('/', validate(getAllTransactions.validationScheme), getAllTransactions);
  router.post('/', validate(createTransaction.validationScheme), createTransaction);

  app.use(router.routes())
    .use(router.allowedMethods());
};