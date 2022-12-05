const express = require('express');
const router = express.Router();
const {  indexGET,
    comoComprarGET,
    contactoGET,
    productoDetalleGET,
    sobreNosotrosGET
} = require('../controllers/front.js')

// FRONT
router.get('/', indexGET );
router.get('/como-comprar', comoComprarGET)
router.get('/contacto', contactoGET)
router.get('/producto-detalle', productoDetalleGET)
router.get('/sobre-nosotros', sobreNosotrosGET )

module.exports = router;