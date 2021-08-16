import { connectToDatabase } from '../connect/mongoUtil';

const loginToken =  async (request, response) => {
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const { token } = await request.body
    const user = await collection.findOne({token: token});
    if (user) {
        return response.status(200).json({result:`Logado com sucesso!`, user: user})
    } else {
        return response.status(400).json({result: `Erro no Login!` })
    }
}

export default loginToken