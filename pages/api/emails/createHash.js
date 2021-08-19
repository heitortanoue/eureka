import { connectToDatabase } from '../connect/mongoUtil';

export default async (request, response) => {
    const {email} = request.body
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const collectionHash = db.collection('hash');

    const user = await collection.findOne({'email': email}, {projection: {_id: true}});
    if (user){
        const findHash = await collectionHash.findOne({'id_user': user._id.toString()});
        if (findHash) {
            return response.status(201).json({result: `O email para recuperação de senha já foi enviado!` })
        } else {
            //Criar hash
            const hash = await collectionHash.insertOne({id_user: user._id.toString(), createdAt: new Date()});
            return response.status(200).json({result: `Email para recuperação de senha enviado com sucesso!`, hash: hash.insertedId.toString() })
        }        
    } else {
        return response.status(201).json({result: `Esse email não está cadastrado!` })
    }
}