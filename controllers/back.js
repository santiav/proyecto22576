// const productos = require('../data/productos.json')

const db = require('../models/connection.js');

const adminGET = (req, res) => {

	let logueado = req.session.logueado
	if (logueado) {
		let sql = "SELECT * FROM productos"

		db.query(sql, (err, data) => {
			if (err) throw err
			// console.log(data)
			res.render('admin', {
				titulo: "Panel de control",
				logueado: logueado,
				usuario: req.session.nombreUsuario,
				productos: data
			})
		})
	} else {
		res.render('login', {
            titulo: "Login",
            error: "Nombre de usuario o clave incorrecto(s)"
        })
	}



}

const agregarProductoGET = (req, res) => {
	res.render('agregar-producto', {
		titulo: "Agregar un producto"
	})
}

const agregarProductoPOST = (req, res) => {

	let producto = req.body
	let sql = "INSERT INTO productos SET ?"
	db.query(sql, producto, (err, data) => {
		if (err) throw err
		console.log("producto agregado")
		res.render("agregar-producto", {
			mensaje: "Producto agregado",
			titulo: "Agregar un producto"
		})
	})

}

const editarProductoGET = (req, res) => {
	// /editar/1
	const id = req.params.id // parámetro de la url
	console.log("PARAM ID -->", id)

	const sql = "SELECT * FROM productos WHERE id = ?"
	db.query(sql, id, (err, data) => {
		if (err) throw err
		console.log("DATA", data[0])
		if (data == "") {
			res.send(`
				<h1>no existe producto con id ${id}</h1>
                <a href="./admin/">Ver listado de productos</a> 		
			`)
		} else {
			res.render('editar-producto', {
				titulo: "Editar producto",
				producto: data[0]
			})
		}
	})




}

const editarProductoPOST = (req, res) => {
	const id = req.params.id // parámetro de la url
	console.log("PARAM ID -->", id)

	const producto = req.body  // datos del formulario

	const sql = "UPDATE productos SET ? WHERE id = ?"
	db.query(sql, [producto, id], (err, data) => {
		if (err) throw err
		console.log("DATA", data)
		console.log(`${data.affectedRows} registro actualizado`);
		res.redirect('/admin');
	})

}

const borrarProducto = (req, res) => {
	const id = req.params.id // parámetro de la url

	const sql = "DELETE FROM productos WHERE id = ?"
	db.query(sql, id, (err, data) => {
		if (err) throw err
		console.log(`${data.affectedRows} registro borrado`);
		res.redirect('/admin');
	})
}

const loginGET = (req, res) => {

	res.render('login', {
		
	})
}

const loginPOST = (req, res) => {
	const usuario = req.body.usuario
	const clave = req.body.clave

	if (usuario && clave) { // chequea que NO estén vacios 
		let sql = 'SELECT * FROM cuentas WHERE usuario = ? AND clave = ?'

		db.query(sql, [usuario, clave], (err, data) => {
			if (data.length > 0) {
				console.log(req.session)
				req.session.logueado = true; // Creamos una propiedad llamada "logueado" para que el objeto session almacene el valor "TRUE", es para usarlo en el parcial de "header"
				req.session.nombreUsuario = usuario
				res.redirect('/admin')
			} else {
				res.render('login', {
					titulo: "Login",
					error: "Nombre de usuario o clave incorrecto(s)"
				})
			}
		})
	} else {
		res.render("login", {
			titulo: "Login",
			error: "Por favor escribe un nombre de usuario y clave"
		})
	}


}

module.exports = {
	adminGET,
	agregarProductoGET,
	agregarProductoPOST,
	editarProductoGET,
	editarProductoPOST,
	borrarProducto,
	loginPOST,
	loginGET
}