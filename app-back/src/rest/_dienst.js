const Router = require('@koa/router');
const dienstService = require('../service/dienst');
const Joi = require('joi');
const validate = require('../core/validation');

const getAll = async (ctx) => {
    ctx.body = await dienstService.getAll();
    console.log(ctx.body);
};
getAll.validationScheme = {
    query: Joi.object({
        limit: Joi.number().positive().max(1000).optional(),
        offset: Joi.number().min(0).optional(),
    }).and('limit', 'offset'),
};

module.exports = (app) => {
    const router = new Router({
        prefix: '/diensten',
    });

    router.get('/', validate(getAll.validationScheme), getAll);

    app.use(router.routes())
        .use(router.allowedMethods());
};