import { connectToDatabase } from '../connect/mongoUtil';
var bcrypt = require('bcryptjs');

//FUNÇÃO PARA REALIZAR O LOGIN
export default async (request, response) => {
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');

    if (request.body.token){
        const user = await collection.findOne({token: request.body.token}, {});
        if (user){
            return response.status(200).json({result:`Logado com sucesso!`, user: user})
        } else {
            return response.status(400).json({result: `Erro no Login!` })
        }
    } else {
        const {email, senha} = await request.body;
        const user = await collection.findOne({email: email}, {});
        if (user) {
            const hash = user.senha;
            if(bcrypt.compareSync(senha, hash)){
                return response.status(200).json({result:`Logado com sucesso!`, user: user}) 
            }else{
                return response.status(400).json({result: `Senha incorreta` })
            }      
        }else{
            return response.status(400).json({result: `Email não cadastrado` })
        }
    }
}