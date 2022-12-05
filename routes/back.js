const express = require('express');
const router = express.Router();
const {   adminGET,
    agregarProductoGET,
    editarProductoGET,
    loginGET
} = require('../controllers/back.js')

// BACK
router.get('/admin', adminGET)

router.get('/agregar-producto', agregarProductoGET)

router.get('/editar-producto', editarProductoGET)

router.get('/login', loginGET)

module.exports = router;
