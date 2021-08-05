import { connectToDatabase } from './mongoUtil';
var bcrypt = require('bcryptjs');

//Função para inserir usuário
export default async (request, response) => {
    const { email, senha, nome, username, faculdade, dataNasc } = await request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    
    //VERIFICAÇÃO DE EMAIL
    const countEmail = await collection.findOne({email: email}, {});
    if (countEmail) {
        console.log("Email já cadastrado!")
        return response.status(400).json({resultado: `Email já cadastrado!` })
    }

    let data = {}
    data.email = email;
    data.senha = hash;
    data.nome = nome;
    data.username = username;
    data.faculdade = faculdade;
    data.dataNasc = dataNasc;
    await collection.insertOne(data);
       
    return response.status(201).json({resultado: `Operação realizada com sucesso!` })
}