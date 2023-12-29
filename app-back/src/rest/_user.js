const Joi = require('joi');
const Router = require('@koa/router');

const userService = require('../service/user');
const validate = require('../core/validation');

const {
  authorization,
  permissions,
} = require('../core/auth');


const register = async (ctx) => {
  const token = await userService.register(ctx.request.body);
  ctx.body = token;
  ctx.status = 201;
};
register.validationScheme = {
  body: {
    name: Joi.string(),
    password: Joi.string(),
  },
};

const login = async (ctx) => {
  const verification = await userService.login(ctx.request.body);
  ctx.body = verification;
  if (verification.validated) {
    ctx.status = 201;
  } else {
    ctx.status = 401;
  }
};
login.validationScheme = {
  body: {
    name: Joi.string(),
    password: Joi.string(),
  },
};

const verify = async (ctx) => {
  const bool = await userService.verify(ctx.request.body);
  ctx.body = bool;
  ctx.status = 201;
};
verify.validationScheme = {
  body: {
    token: Joi.string(),
  },
};

const update = async (ctx) => {
  // console.log(ctx.request.body)
  const token = ctx.headers.authorization;
  const verification = await userService.update(token, ctx.request.body);
  ctx.body = verification;
  ctx.status = 201;
};
update.validationScheme = {
  body: {
    name: Joi.string(),
  },
};


const promote = async (ctx) => {
  const { name, role } = ctx.request.body;
  const token = ctx.headers.authorization;
  console.log(name)
  console.log(role)
  const promoted = await userService.promote({ token, name, role });
  ctx.status = 204;

};
promote.validationScheme = {
  body: {
    name: Joi.string(),
    role: Joi.string(),
  },
};

module.exports = function installUserRouter(app) {
  const router = new Router({
    prefix: '/user',
  });

  router.post('/login', validate(login.validationScheme), login);
  router.post('/verify', validate(verify.validationScheme), verify);

  router.post('/update', authorization(permissions.loggedIn), update);
 
  router.post('/register', validate(register.validationScheme), register);
  router.put('/promote', validate(promote.validationScheme), promote);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};