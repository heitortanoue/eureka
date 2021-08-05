import {mongoose} from 'mongoose';

const resposta_comentarioSchema = new mongoose.Schema({
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
    emailUsuario:{
        type: String,
        require: true,
        lowercase: true
    }, 
    ID_Comentario :{
        type: String
    },
    data:{
        type:Date,
        defaul: Date.now
    }
});

const resposta_comentario = mongoose.model('resposta_comentario', resposta_comentarioSchema );

module.exports = resposta_comentario;