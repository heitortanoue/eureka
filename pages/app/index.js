import Header from "../../components/in/header"
import Footer from "../../components/out/footer"
import Pergunte from "../../components/in/pergunte"
import getMoreQuestions from "/server/utils/getMoreQuestions"
import { useState } from "react"
import { connectToDatabase } from "../api/connect/mongoUtil"
import timeFromPost from "../../utils/functions/timeFromPost"
import UserImage from "../../components/global/userImage"
import Logout from "/utils/functions/logout"

export const getStaticProps = async () => {
    var ObjectId = require('mongodb').ObjectId; 
    const {db} = await connectToDatabase();
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');

    //PEGAR PERGUNTAS
    let perguntas = await colPerguntas.find({}).sort({_id:-1}).limit(10).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {nome: 1, foto: 1})
        quest["nome"] = await obj.nome
        quest["foto"] = await obj.foto
    }

    const data = await JSON.stringify(perguntas)
    return {
        props: { questions: data },
        revalidate: 30
    }
 }

export default function Inicio ({ questions }) {
    const [showAsk, setShowAsk] = useState(false)
    function handleChange(newValue) {
        setShowAsk(newValue);
      }
    return (
        <>
            <div className={showAsk ? "" : "hidden"}>
                <Pergunte value={showAsk} onChange={handleChange}/>
            </div>
            <div className="bg-light-darker">
                <Header/>
                <div className="my-10 flex">
                    <div className="mx-auto flex flex-col gap-5">
                        <button onClick={() => setShowAsk(!showAsk)} className="button blue_button">Pergunte agora!</button>
                        <Logout></Logout>
                    </div>
                </div>
                <div className="flex flex-col mx-5 gap-5 mb-7">
                    {JSON.parse(questions).map(quest => {
                        return (
                            <div className="bg-white p-5 flex flex-col gap-3 font-body rounded-3xl shadow-md" key={quest._id}>
                                <div className="flex gap-2 items-center">
                                    <div className="relative w-10 h-10">
                                        <UserImage src={quest.foto}/>
                                    </div>  
                                    <div>
                                        <p className="font-bold">{quest.nome}</p>
                                        <p className="text-grey text-sm">{timeFromPost(quest.date)}</p>
                                    </div>
                                </div>
                                <div className="text-justify">
                                    {quest.texto}
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-blue">
                                        <div className="font-bold">{quest.materia}</div>
                                        <div className="font-semibold">{quest.assunto}</div>
                                    </div>
                                    <button className="button blue_button">Responda</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Footer/>
            </div>
        </>
    )
}