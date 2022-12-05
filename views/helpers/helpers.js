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