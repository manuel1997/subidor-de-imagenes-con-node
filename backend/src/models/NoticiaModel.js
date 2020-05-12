const {Schema,model} = require('mongoose');

const NoticiaSchema = new Schema ({
    title:{
        type:String,
        required:false,
    },
    descripcion:{
        type:String,
        required:false,
    },
    img:{
        type:String,
        required:false,
    }

},{
    timestamps:true
})

module.exports = model ('Noticia',NoticiaSchema);