import {mongoose} from 'mongoose';
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email :{
        type: String,
        require: true,
        unique: true,
        lowercase: true
    },
    nome:{
        type: String, 
        require: true,
    },
    username:{
        type: String,
        require: true,
        lowercase: true
    },
    senha:{
        type: String, 
        require: true,
        select: true
    },
    dataNasc:{
        type : Date,
        require: true
    },
    faculdade:{
        type: String,
        require: true,
    }, 
    fotoPerfil:{
        type: String,
        require: true,
    },
    bio:{
        type: String,
        require: true,
    },
    kPoints:{
     type: Number
    }
});

const usuario = mongoose.model('usuario', userSchema );

export default usuario;

/// Load models - importar model const usuario = require('./models/usuario');
