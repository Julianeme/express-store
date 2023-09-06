const express = require('express');
const cors = require('cors')
const routerApiV1 = require('./routes/v1Routes')
const routerApiV2 = require('./routes/v2Routes')
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

//---UTILIZANDO PRNCIPIO DE UNICA RESPONSABILIDAD---

//el siguiente middleware permite leer y mostrar lo que retorna en el
//body una respuesta a un requesti tipo POST por ejemplo
app.use(express.json())

// make sure the server is set up to serve static files correctly.
app.use(express.static('public'));

//podemos crear una lista de sitios permitidos para hacer peticiones a nuestra app asi:
const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) =>{
    if(whitelist.includes(origin) || !origin){
      callback(null, true)
      //null quiere decir que no hay errores y true que esta permitido el acceso
    } else {
      callback(new Error('Origen de peticion no permitida'))
    }
  }
}
//colocando el middleware de CORS aqui, sin whitelist ni options, dariamos accesso a nuestra app
//a peticiones desde cualquier origen, esto es util para api publicas, no internas
app.use(cors(options))


app.get('/', (req, res) => {
  res.send(`
  <h1>Express study home page</h1>
  <img src="/resources/images/bg_image_fullHD.jpg" alt="placeholder image" />
  `)
});


// utilizamos el routerApi
routerApiV1(app)
routerApiV2(app)

//el uso del middleware se da despues del ruteo
//el orden en el que se escriben es el orden en el que se ejecutan
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler)

//el siguiente console.log no deberia usarse en produccion, solo en desarrollo
app.listen(port, ()=>{
  console.log(`Running on port ${port}`)
});
