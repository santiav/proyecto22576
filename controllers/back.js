// const productos = require('../data/productos.json')
const { multer, almacenamiento, maxSizeMB, upload} = require('../views/helpers/multer')
const db = require('../models/connection.js');
const fs = require('fs') // FileSystem (modulo nativo de NodeJS)

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
            error: "Por favor, debes loguearte para ver ésta sección"
        })
	}



}

const agregarProductoGET = (req, res) => {
	let logueado = req.session.logueado
	if (logueado) {
		res.render('agregar-producto', {
			titulo: "Agregar un producto"
		})

	} else {
		res.render('login', {
            titulo: "Login",
            error: "Por favor, debes loguearte para ver ésta sección"
        })
	}
}

const agregarProductoPOST = (req, res) => {


	let logueado = req.session.logueado
	if (logueado) {

		// Usar función de multer
		upload(req, res, error => {

			// PRIMER PASO, CHEQUEA SI HAY ERROR
			if (error instanceof multer.MulterError) {
				// Error de Multer al subir imagen
				if (error.code === "LIMIT_FILE_SIZE") {
					return res.status(400).render('agregar-producto', { 
						mensaje: `Imagen muy grande, por favor ahicar a ${maxSizeMB}`,
						clase: "danger"
					});
				}
				return res.status(400).render('agregar-producto', { mensaje: error.code});
			} else if (error) {
				// Ocurrió un error desconocido al subir la imagen
				return res.status(400).render('agregar-producto', { mensaje: error});
			}

			// TODO ESTUVO BIEN - instrucciones 
        	// almacenar los campos (fields)
			const productoDetalles = req.body;
			const nombreImagen = req.file.filename;
			console.log("AGREGAR-PRODUCTO Req.FILE", req.file)
			console.log("AGREGAR-PRODUCTO nombreImagen", req.file.filename)
			productoDetalles.rutaImagen = nombreImagen
			console.log("AGREGAR PRODUCTO productoDetalles", productoDetalles )
			
			 // Consulta SQL - insertar data en la DB
			 const sql = 'INSERT INTO productos SET ?';
			 db.query(sql, productoDetalles, (err, data) => {
				if (err) throw err
				res.render("agregar-producto", { 
					mensaje: "Producto agregado correctamente", 
					titulo: 'Agregar producto',
					clase: "success"
				}) 

			 })
			 // res.redirect("admin")
		})
	} else {
		res.render('login', {
            titulo: "Login",
            error: "Por favor, debes loguearte para hacer ésta acción"
        })
	}

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


	let logueado = req.session.logueado
	if (logueado) {
		upload(req, res, error => {

			// PRIMER PASO, CHEQUEA SI HAY ERROR
			if (error instanceof multer.MulterError) {
				// Error de Multer al subir imagen
				if (error.code === "LIMIT_FILE_SIZE") {
					return res.status(400).render('agregar-producto', { 
						mensaje: `Imagen muy grande, por favor ahicar a ${maxSizeMB}`,
						clase: "danger"
					});
				}
				return res.status(400).render('agregar-producto', { mensaje: error.code});
			} else if (error) {
				// Ocurrió un error desconocido al subir la imagen
				return res.status(400).render('agregar-producto', { mensaje: error});
			}

			const id = req.params.id // parámetro de la url
			const productoDetalles = req.body  // datos del formulario

			// chequear si la edición incluyó cambio de imagen
			if (req.hasOwnProperty("file")) {

				const nombreImagen = req.file.filename;
				productoDetalles.rutaImagen = nombreImagen

				let borrarImagen = 'SELECT rutaImagen FROM productos WHERE id = ?';
				db.query(borrarImagen, [id], function (err, data) {
					if (err) throw err;

					fs.unlink(`public/uploads/${data[0].rutaImagen}`, (err) => {
						if (err) throw err;

						let  sql = `UPDATE productos SET ? WHERE id= ?`;
						db.query(sql, [productoDetalles, id], function (err, data) {
                            if (err) throw err;
                            console.log(data.affectedRows + " registro(s) actualizado(s)");
                        });
					})

				})
			} else {

				 // Insertar datos modificados (sin haber cambiado la imagen)
				 let sql = `UPDATE productos SET ? WHERE id= ?`;
				 
				 db.query(sql, [productoDetalles, id], function (err, data) {
					 if (err) throw err
					 console.log(data.affectedRows + " registro(s) actualizado(s)");
				 });
				 
				 res.redirect('/admin');
			}

		}) // fin upload

	} else {
		res.render('login', {
            titulo: "Login",
            error: "Por favor, debes loguearte para hacer ésta acción"
        })

	}

}

const borrarProducto = (req, res) => {
	const id = req.params.id // parámetro de la url


	let borrarImagen = 'SELECT rutaImagen FROM productos WHERE id = ?';
	db.query(borrarImagen, [id], function (err, data) {
		if (err) throw err;

		fs.unlink(`public/uploads/${data[0].rutaImagen}`, (err) => {
			if (err) throw err;

			const sql = "DELETE FROM productos WHERE id = ?"
			db.query(sql, id, (err, data) => {
				if (err) throw err
				console.log(`${data.affectedRows} registro borrado`);
				res.redirect('/admin');
			})
			
		})

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