import getMoreQuestions from "/server/utils/getMoreQuestions"
import { useState, useContext } from "react"
import { connectToDatabase } from "../api/connect/mongoUtil"
import Pergunta from "../../components/in/perguntas/pergunta"
import Banner from "../../components/in/mainPage/banner"
import Head from "next/head"
import { UserContext } from "/utils/contexts/userContext"
import Container from "/components/in/container"
import SearchField from "../../components/global/searchField"

export const getStaticProps = async () => {
    var ObjectId = require('mongodb').ObjectId; 
    const {db} = await connectToDatabase();
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');

    //PEGAR PERGUNTAS
    let perguntas = await colPerguntas.find({}).sort({_id:-1}).limit(10).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
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
    const USERCONTEXT = useContext(UserContext)

    function handleChange(newValue) {
        setShowAsk(newValue);
      }

    return (
        <>  
            <Head>
                <title>Eureka</title>
            </Head>
            <Container>
                <div className="flex flex-col gap-6 flex-1">
                    <div className="block lg:hidden font-extrabold text-blue-dark text-4xl">
                        Descubra
                    </div>
                    <Banner/>
                    <SearchField/>
                    <div className="flex justify-between items-center text-sm">
                        <button className="flex justify-between gap-1 items-center p-1 border-2 border-white rounded-lg cursor-pointer">
                            <i className="fas fa-filter"></i>
                            Filtrar
                        </button>
                        <div className="cursor-pointer">
                            Ver Tudo
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 mb-6">
                        {JSON.parse(questions).map(quest => {
                            return (
                                <div key={quest._id}>
                                    <Pergunta quest={quest}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </>
    )
}