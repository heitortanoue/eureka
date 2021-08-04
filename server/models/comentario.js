import {mongoose} from 'mongoose';

const comentarioSchema = new mongoose.Schema({
    texto: {
        type: String,
        require:true
    },
    qtd_Reacao:{
        type: Number
    },
    qtd_Denuncia:{
        type: Number
    },
    melhor_Comentario: {
        type: Boolean
    },
    emailUsuario:{
        type: String,
        require: true,
        lowercase: true
    }, 
    ID_pergunta :{
        type: String
    },
    data:{
        type:Date,
        defaul: Date.now
    }

});

const comentario = mongoose.model('comentario', comentarioSchema );

module.exports = comentario;

