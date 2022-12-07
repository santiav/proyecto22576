// const productos = require('../data/productos.json')
const db = require('../models/connection.js');


const indexGET = (req, res) => {

	let sql = "SELECT * FROM productos WHERE destacado = 1"

	db.query(sql, (err,data) => {
		if (err) throw err
		console.log(data)
		res.render('index', {
			titulo: "Mi página web",
			productos: data
		})
	})
	
}

const comoComprarGET = (req, res) => {
	res.render('como-comprar', {
		titulo: "Cómo comprar"
	})
}

const contactoGET = (req, res) => {
	res.render('contacto', {
		titulo: "Contacto"
	})
}

const productoDetalleGET = (req, res) => {
	res.render('producto-detalle', {
		titulo: "Detalle del producto"
	})
}

const sobreNosotrosGET = (req, res) => {
	res.render('sobre-nosotros', {
		titulo: "Sobre nosotros"
	})
}

module.exports = {
    indexGET,
    comoComprarGET,
    contactoGET,
    productoDetalleGET,
    sobreNosotrosGET
}