import { connectToDatabase } from '../connect/mongoUtil';
import moment from 'moment';

export default resultados = async (request, response) => {
    const {id_user} = await request.body;
    const {db} = await connectToDatabase();
    const collection = db.collection('comentario');

    //Geral 
    const allComentarios = await collection.find({'id_user': id_user}, {projection: { qtd_reacao: true, _id: false, date: true }}).toArray();
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

    return response.status(200).json({result: "Quantidade vitalicia gerada sucesso!", res : {vitalicio : vitalicio, semanal: semanal} });
}