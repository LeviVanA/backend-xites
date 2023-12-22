const emoji = require('node-emoji');
const { getLogger } = require('./logging'); 
const ServiceError = require('./serviceError'); // 👈 1

const NODE_ENV = config.get('env');



app.use(async (ctx, next) => {
  getLogger().info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);

  const getStatusEmoji = () => {
    if (ctx.status >= 500) return emoji.get('skull');
    if (ctx.status >= 400) return emoji.get('x');
    if (ctx.status >= 300) return emoji.get('rocket');
    if (ctx.status >= 200) return emoji.get('white_check_mark');
    return emoji.get('rewind');
  };

  try {
    await next(); 

    getLogger().info(
      `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`
    ); 
  } catch (error) {
    getLogger().error(
      `${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`,
      {
        error,
      }
    );

    throw error;
  }
});

app.use(bodyParser());

app.use(async (ctx, next) => {
    try {
      await next(); 
    } catch (error) {
      getLogger().error('Error occured while handling a request', { error });
      let statusCode = error.status || 500;
      let errorBody = { 
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || {},
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
      };
  
      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }
  
        if (error.isValidationFailed) {
          statusCode = 400;
        }
      }
  
      ctx.status = statusCode; 
      ctx.body = errorBody; 
    }
  });
  
  app.use(async (ctx, next) => {
    await next();
  
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND',
        message: `Unknown resource: ${ctx.url}`,
      };
    }
  });
