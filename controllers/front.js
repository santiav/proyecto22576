// const productos = require('../data/productos.json')
const db = require('../models/connection.js');
const nodemailer = require('nodemailer');

const indexGET = (req, res) => {

	let sql = "SELECT * FROM productos WHERE destacado = 1"

	db.query(sql, (err, data) => {
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

const contactoPOST = (req, res) => {

	// Tomo información del formulario
	let data = req.body
	console.log(data)

	// Indico el servicio de EMAIL
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.SMTP_USERNAME,
			pass: process.env.SMTP_PASSWORD
		}
	});

	// Se crea variable para crear el EMAIL
	const mailOptions = {
		from: data.nombre,
		to: process.env.EMAIL_TO,
		subject: `Contacto - ${data.asunto}`,
		html: `
			<h1>${data.nombre}</h1>
			<p>${data.mensaje}</p>
		`
	};


	// envia el email
	transporter.sendMail(mailOptions,  (error, info) => {
        if (error) {
            console.log(error)
            res.status(500, error.message)
            res.status(500).render('contacto', {
                mensaje: `Ha ocurrido el siguiente error ${error.message}`,
                mostrar: true,
                clase: 'danger'
            })
        } else {
            console.log('E-mail enviado')
            res.status(200).render('contacto', {
                mensaje: "Mail enviado correctamente",
                mostrar: true,
                clase: 'success'
            })
        }
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
	contactoPOST,
	productoDetalleGET,
	sobreNosotrosGET
}