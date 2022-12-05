const productos = require('../data/productos.json')

const adminGET = (req, res) => {
	res.render('admin', {
		titulo: "Panel de control",
		productos: productos[0].data
	})
}

const agregarProductoGET =  (req, res) => {
	console.log("estas en agregar")
	res.render('agregar-producto', {

	})
}

const editarProductoGET = (req, res) => {
	console.log("estas en editar")
	res.render('editar-producto', {

	})
}

const loginGET = (req, res) => {
	console.log("estas en login")
	res.render('login', {

	})
}

module.exports = {
    adminGET,
    agregarProductoGET,
    editarProductoGET,
    loginGET
}