const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/upload-img',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
    .then(db =>console.log('la base de datos esta conectada'))
    .catch(err =>console.log(err));