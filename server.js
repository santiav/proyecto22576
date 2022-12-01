const express = require('express')
const app = express()
const hbs = require('hbs');
const productos = require('./data/products.json')

const port = 3000

app.set('view engine', 'hbs'); // indica que usaremos la plantilla "handlebars"
hbs.registerPartials(__dirname + '/views/partials'); // indicamos el directorio hacia los parciales

app.use(express.static('public')); // indica la carpeta public para considerar archivos estáticos



// Cuando voy a la raiz, entonces se ejecutan las siguientes instrucciones, por ejemplo, responde con renderizar el archivo index, que se encuentra en la carpeta views.
app.get('/', (req, res) => {
  // (indica el nombre del archivo hbs, objeto)
  res.render('index', {
    titulo: "Mi página web",
    productos: productos.products
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



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})