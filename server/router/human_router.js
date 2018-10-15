const Router = require('koa-router');
const router = new Router();
const human_controller = require('../controller/human_controller');

router.post('/human/add', human_controller.addHuman);
router.post('/human/update', human_controller.updateHuman);
router.post('/face/register', human_controller.registerHuman);
router.post('/human/remove',human_controller.removeHuman);

module.exports = router;
