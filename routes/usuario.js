const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController.js');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', usuarioController.list);
router.post('/add', usuarioController.add);
router.post('/login', usuarioController.login);
router.put('/update', usuarioController.update);
router.put('/activate', usuarioController.activate);
router.put('/deactivate', usuarioController.deactivate);


module.exports = router;