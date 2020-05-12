const {Router} = require('express');
const router = Router();


const {VerPaginate,VerNoticias,prevNoticia,upload,CrearNotica,updateNoticia,deleteNoticia} = require('../controllers/NoticiaController');

    router.get('/:page', VerPaginate);

    router.get('/', VerNoticias);

    router.get('/noticia/:id', prevNoticia);

    router.post('/', upload.single('imagen'), CrearNotica);

    router.put('/update/:id', updateNoticia);
    
    router.delete('/delete/:id', deleteNoticia);


    module.exports = router