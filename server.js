
const express = require('express')
const app = express()
const hbs = require('hbs');

app.set('view engine', 'hbs'); // seteo motor de plantilla 
hbs.registerPartials(__dirname + '/views/partials'); // Indico donde se encuentran los "parciales"

app.use(express.static('public')); // Tomar los archivos de public


// Ruta RAÍZ (index)
app.get('/', function (req, res) {
   res.render('index', {
        titulo: "Mi página web"

   })

})

// About (sobre nosotros)
app.get('/about', function (req, res) {
    res.render('about', {
         titulo: "Sobre nosotros"
         
    })
 
 })

app.listen(3000, () => {
    console.log('listening on port 3000')
})