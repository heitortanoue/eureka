import { connectToDatabase } from './mongoUtil';

//Função para inserir usuário
export default async (request, response) => {
    const { email, senha, nome, username, faculdade, dataNasc } = await request.body
    const {db} = await connectToDatabase();
    const collection = db.collection( 'usuario' );
    
    let data = {}
    data.email = email;
    data.senha = senha;
    data.nome = nome;
    data.username = username;
    data.faculdade = faculdade;
    data.dataNasc = dataNasc;
    await collection.insertOne(data);
   
    console.log('Dados usuario inserido');
       
    return response.status(201).json({resultado: `Operação realizada com sucesso!` })
}