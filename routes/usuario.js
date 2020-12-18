const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController.js');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', usuarioController.list);
router.get('/login', usuarioController.add);


module.exports = router;