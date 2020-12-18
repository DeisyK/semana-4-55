/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const articuloController = require('../controllers/ArticuloController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', articuloController.list);
router.get('/add', articuloController.add);
router.get('/update', articuloController.update);
router.get('/activate', articuloController.activate);
router.get('/deactivate', articuloController.deactivate);


module.exports = router;