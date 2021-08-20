import { connectToDatabase } from '../connect/mongoUtil';
import token from '../../../utils/tokenGenerator';
var bcrypt = require('bcryptjs');

//Função para inserir usuário
const usuarioCadastro = async (request, response) => {
    const { email, senha, nome, username, faculdade, dataNasc, curso } = await request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);
    
    //VERIFICAÇÃO DE EMAIL
    const countEmail = await collection.findOne({email: email});
    if (countEmail) {
        return response.status(400).json({result: `Email já cadastrado!` })
    }
    //VERIFICAÇÃO DE usuario
    const countUsuario = await collection.findOne({username: username});
    if (countUsuario) {
        return response.status(400).json({result: `Username já cadastrado!` })
    }

    let data = {}
    data.email = email;
    data.senha = hash;
    data.nome = nome;
    data.username = username;
    data.faculdade = faculdade;
    data.dataNasc = dataNasc;
    data.fav_disciplinas = [];
    data.token = token;
    data.bio = ""
    data.curso = curso
    data.foto = null
    data.resultados = {vitalicio: 0, semanal: 0}
    await collection.insertOne(data);
       
    return response.status(200).json({result: `Cadastro realizado com sucesso!`, user: data})
}

export default usuarioCadastro