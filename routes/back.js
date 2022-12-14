const express = require('express');
const router = express.Router();
const {   adminGET,
    agregarProductoGET,
    agregarProductoPOST,
    editarProductoGET,
    editarProductoPOST,
    loginGET
} = require('../controllers/back.js')

// BACK
router.get('/admin', adminGET)

router.get('/agregar-producto', agregarProductoGET)
router.post('/agregar-producto', agregarProductoPOST)

router.get('/editar-producto/:id', editarProductoGET)
router.post('/editar-producto/:id', editarProductoPOST)

router.get('/login', loginGET)

module.exports = router;
