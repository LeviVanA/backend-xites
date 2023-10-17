const Koa = require('koa');
const config = require('config'); 
const winston = require('winston');
const bodyParser = require('koa-bodyparser');
const Router = require('@koa/router'); 
const transactieService = require('./service/transactie');

const router = new Router();


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level'); 
const LOG_DISABLED = config.get('log.disabled'); 

console.log(`log level ${LOG_LEVEL}, logs enabled: ${LOG_DISABLED !== true}`); 

const app = new Koa();

const logger = winston.createLogger({
  level: LOG_LEVEL, 
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({ silent: LOG_DISABLED }) 
  ]
});


router.get('/api/transactions', async (ctx) => { 
  ctx.body = transactieService.getAll();
});

app.use(router.routes()) 
   .use(router.allowedMethods());


app.listen(9000, () => {
  logger.info('🚀 Server listening on http://localhost:9000');
});
