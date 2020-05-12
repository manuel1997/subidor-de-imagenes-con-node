const multer =require('multer');
const  fs = require('fs');
const path = require('path');

const NoticiaController = {};


const Noticia = require('../models/NoticiaModel');

NoticiaController.VerPaginate = async (req, res, next) => {
    let perPage = 3;
    let page = req.params.page || 1;

  await  Noticia
    .find({}).sort({createdAt: -1})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec((err,noticias) => {
        Noticia.countDocuments((err,conteo) =>{
            if(err) return next(err);
            if(noticias.length > 0){
            res.json({
                noticias,
                current:page,
                pages:Math.ceil(conteo/perPage),
            });
        }else{
            res.json({mensaje:'0'});
        }
        })
    })
};

NoticiaController.VerNoticias = async (req,res) =>{
    const noticias = await Noticia.find(); 
     return res.json(noticias);
}

NoticiaController.prevNoticia = async (req,res) => {
    const { id } = req.params;
    const noticia_ver = await Noticia.findById(id);
    return res.json(noticia_ver);
}

NoticiaController.upload = multer({
    storage:multer.diskStorage({
        destination: path.join(__dirname,'../public/uploads'),
        filename:(req,file,cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        }
      }),
      dest: path.join(__dirname,'../public/uploads'),
      limits:{fieldSize:1000000},
      fileFilter:(req,file,cb) =>{
        const filetype = /jpeg|jpg|png|gif|/;
        const mimetype = filetype.test(file.mimetype);
        const extname = filetype.test(path.extname(file.originalname));
        if(mimetype && extname){
          return cb(null,true);
      }
      cb("Error archivo no es valido");
      }
  })

NoticiaController.CrearNotica = async (req,res) =>{
    const {title,descripcion} = req.body;
    const img = req.file.filename;
    const NuevaNoticia = new Noticia({title:title,descripcion:descripcion,img:img});
    await NuevaNoticia.save();
    return res.json({ message: 'Photo created' });
}

NoticiaController.deleteNoticia = async (req,res) => {
    const noticia = await Noticia.findByIdAndDelete(req.params.id);
    await fs.unlinkSync(path.resolve('./src/public/uploads/'+noticia.img));
    return res.json({ message: 'Photo deleted' });
 }

 NoticiaController.updateNoticia = async (req,res) => {
    const { id } = req.params;
    const { title, descripcion } = req.body;
    await Noticia.findByIdAndUpdate(id,{title,descripcion});
    return res.json({message: 'Successfully updated',});
 }

module.exports = NoticiaController;
