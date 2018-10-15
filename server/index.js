const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const config = require("./config")
const app = new Koa();

app.use(cors());
app.use(bodyParser());

const human_router = require('./router/human_router');

app.use(human_router.routes()).use(human_router.allowedMethods());

app.listen(config.port,() => {
    console.log(`This server is listening on port ${config.port}`)
});