import {mongoose} from 'mongoose';

const perguntaSchema = new mongoose.Schema({
    texto: {
        type: String,
        require:true
    },
    qtd_Reacao:{
        type: Number
    },
    assunto:{
        type: String,
        require:true
    },
    materia:{
        type: String,
        require:true
    },
    foto:{
        type: String,
        require: true,
    },
    emailUsuario:{
        type: String,
        require: true,
        lowercase: true
    }, 
    data:{
        type:Date,
        defaul: Date.now
    }
});

const pergunta = mongoose.model('pergunta', perguntaSchema );

module.exports = pergunta;