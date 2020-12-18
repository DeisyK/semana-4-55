const routerx = require('express-promise-router');
const categoriaController = require('../controllers/CategoriaController.js');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', categoriaController.list);
router.get('/add', categoriaController.add);
router.get('/update', categoriaController.update);
router.get('/activate', categoriaController.activate);
router.get('/desactivate', categoriaController.desactivate);


module.exports = router;