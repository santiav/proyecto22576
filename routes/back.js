const express = require('express');
const router = express.Router();
const {   adminGET,
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    borrarProducto,
    loginPOST,
    loginGET
} = require('../controllers/back.js')

// BACK
router.get('/admin', adminGET)

router.get('/agregar-producto', agregarProductoGET)
router.post('/agregar-producto', agregarProductoPOST)

router.get('/editar-producto/:id', editarProductoGET)
router.post('/editar-producto/:id', editarProductoPOST)

router.get('/borrar/:id', borrarProducto)
router.get('/login', loginGET)
router.post('/login', loginPOST)

module.exports = router;
