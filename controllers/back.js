// const productos = require('../data/productos.json')

const db = require('../models/connection.js');

const adminGET = (req, res) => {

	let sql = "SELECT * FROM productos"

	db.query(sql, (err, data) => {
		if (err) throw err
		console.log(data)
		res.render('admin', {
			titulo: "Panel de control",
			productos: data
		})
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