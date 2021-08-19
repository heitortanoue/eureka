import { connectToDatabase } from '../connect/mongoUtil';
import moment from "moment"

const loginToken =  async (request, response) => {
    const {db} = await connectToDatabase();
    const collection = db.collection('usuario');
    const { token } = await request.body
    const user = await collection.findOne({token: token});
    if (user) {
        const colComent = db.collection('comentario');
        const allComentarios = await colComent.find({'id_user': user._id.toString()}, {projection: { qtd_reacao: true, _id: false, date: true }}).toArray();
        let vitalicio = 0;
        for(const comen of allComentarios){
            vitalicio += comen.qtd_reacao;
        }
        //Semana
        const dataMin = moment(new Date()).subtract(7, 'days');      
        let semanal = 0;
        for(const comen of allComentarios){
            const cond = moment(comen.date).isSameOrAfter(dataMin, 'days');
            if (cond) {
                semanal += comen.qtd_reacao;
            }
        }
        user["resultados"] = {vitalicio : vitalicio, semanal: semanal}
        return response.status(200).json({result:`Logado com sucesso!`, user: user})
    } else {
        return response.status(400).json({result: `Erro no Login!` })
    }
}

export default loginToken