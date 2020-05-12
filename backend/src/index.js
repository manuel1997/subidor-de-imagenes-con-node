const express = require('express');
const path = require('path');
const cors = require('cors');


//Inicializacion
const app = express();
require('./database');

//Settigns
app.use(cors());
app.set('port',3000);
app.use(express.json());

//Routes 
app.use(require('./routes/index.routes'));

//static files
app.use(express.static(path.join(__dirname,'public')))



//Server
app.listen(app.get('port'),() => {
    console.log('servidor corriendo en el puerto', app.get('port'));
  });
  
