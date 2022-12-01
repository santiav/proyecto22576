const express = require('express')
const app = express()
const hbs = require('hbs');
const path = require('path');
const productos = require('./data/productos.json')

const port = 3000

app.set('view engine', 'hbs');
app.set('views', [
	path.join('./views/front'),
	path.join('./views/back'),
	path.join('./views'),
])
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

// FRONT
app.get('/', (req, res) => {
	res.render('index', {
		titulo: "Mi página web",
		productos: productos[0].data
	})
})

app.get('/como-comprar', (req, res) => {
	res.render('como-comprar', {
		titulo: "Cómo comprar"
	})
})

app.get('/contacto', (req, res) => {
	res.render('contacto', {
		titulo: "Contacto"
	})
})

app.get('/producto-detalle', (req, res) => {
	res.render('producto-detalle', {
		titulo: "Detalle del producto"
	})
})

app.get('/sobre-nosotros', (req, res) => {
	res.render('sobre-nosotros', {
		titulo: "Sobre nosotros"
	})
})

// BACK
app.get('/admin', (req, res) => {
	res.render('admin', {
		titulo: "Panel de control",
		productos: productos[0].data
	})
})

app.get('/agregar-producto', (req, res) => {
	console.log("estas en agregar")
	res.render('agregar-producto', {

	})
})

app.get('/editar-producto', (req, res) => {
	console.log("estas en editar")
	res.render('editar-producto', {

	})
})

app.get('/login', (req, res) => {
	console.log("estas en login")
	res.render('login', {

	})
})

app.use((req, res, next) => {
	res.status(404).render('404', {
		titulo: "404 - No encontrado"
	})
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})