const Router = require('@koa/router');
const transactionService = require('../service/transactie');
const userService = require('../service/user');
const Joi = require('joi');
const validate = require('../core/validation');
const {
  addUserInfo,
} = require('../core/auth');

const getAllTransactions = async (ctx) => {
  const limit = 100;
  ctx.body = await transactionService.getAll(limit);
  console.log(ctx.body);
};
getAllTransactions.validationScheme = {
  query: Joi.object({
    limit: Joi.number().positive().max(1000).optional(),
    offset: Joi.number().min(0).optional(),
  }).and('limit', 'offset'),
};

const createTransaction = async (ctx) => {
  console.log({...ctx.request.body})
  const newTransaction = await transactionService.create(ctx.headers.authorization,{
    ...ctx.request.body,
  });
  ctx.body = newTransaction;
};
createTransaction.validationScheme = {
  body: {
    dienst: Joi.string().required(),
    project: Joi.string().required(),
    beschrijving: Joi.string().required(),
    kilometers: Joi.string().required(),
    factureerbaar: Joi.boolean().required(),
    tijdsduur: Joi.string().required(),
    teControleren: Joi.boolean().required(),
    date: Joi.date().less('now'),
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