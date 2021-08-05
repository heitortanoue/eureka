import { connectToDatabase } from './mongoUtil';
import token from '../../utils/tokenGenerator';
var bcrypt = require('bcryptjs');

//Função para inserir usuário
export default async (request, response) => {
    const { email, senha, nome, username, faculdade, dataNasc} = await request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    
    //VERIFICAÇÃO DE EMAIL
    const countEmail = await collection.findOne({email: email}, {});
    if (countEmail) {
        return response.status(400).json({result: `Email já cadastrado!` })
    }

    let data = {}
    data.email = email;
    data.senha = hash;
    data.nome = nome;
    data.username = username;
    data.faculdade = faculdade;
    data.dataNasc = dataNasc;
    data.token = token;
    await collection.insertOne(data);
       
    return response.status(201).json({result: `Cadastro realizado com sucesso!` })
}