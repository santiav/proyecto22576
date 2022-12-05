const productos = require('../data/productos.json')


const indexGET = (req, res) => {
	res.render('index', {
		titulo: "Mi página web",
		productos: productos[0].data
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