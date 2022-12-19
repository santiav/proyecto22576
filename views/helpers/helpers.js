const hbs = require('hbs');
const axios = require('axios');

// https://www.dolarsi.com/api/api.php?type=valoresprincipales

// declaro la variable por afuera por el scope (alcance).
let dolar;
axios.get("https://www.dolarsi.com/api/api.php?type=valoresprincipales")
    .then( resultado => {
        dolar = resultado.data[1].casa.venta
        dolar = dolar.replace(/,/g,".")
        dolar = parseFloat(dolar)
    })
    .catch( err => {
        console.log(err)
    })



hbs.registerHelper('dolarApeso', precio => {
    let totalPesos = dolar * precio
    return new Intl.NumberFormat('es-AR',{style: 'currency', currency: 'ARS'}).format(totalPesos)
})

hbs.registerHelper('listado', texto => {
    // console.log(texto)
    let arr = texto.split(",")
    console.log(arr)
    let html = "<ul>"

    /*
     <ul>
        <li>intel i5</li>
        <li>8gb ram</li>
    */
    for (item of arr) {
        html += `<li> ${item} </li>`
    }

    html += "</ul>"
    return html
})

hbs.registerHelper('check', valor => {

    if (valor == '1') { 
        return `<input type="checkbox" name="destacado" value="1" disabled checked>`
    }
    return `<input type="checkbox" name="destacado" value="0" disabled>`

})

// FUNCION: subida de imagen
let multer  = require('multer');
const e = require('express');
let almacenamiento = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './public/uploads/')
    },
    filename: (req, file, cb) => {
        console.log("FILE", file)
        const fileName = file.originalname.split["."][0]
        const  fileExtension = file.originalname.split["."][1] // ["imagen","jpg"]
        cb(null, `${fileName}-${Date.now()}.${fileExtension}`)
    }
})

let maxSize = (1024 * 1024) * 5 // 5MB
let maxSizeMB = formatBytes(maxSize,2) 

// FUNCION: tamaño de archivo
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const upload = multer({
    storage: almacenamiento,
    limits: {fileSize: maxSize },
    fileFilter: (req,file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Sólo los formatos .png, .jpg y .jpeg son los permitidos'));
        }
    }
}).single("rutaImagen") // lo que está en name