import { useContext, useState } from "react"
import { connectToDatabase } from "../api/connect/mongoUtil"
import Pergunta from "../../components/in/perguntas/pergunta"
import Banner from "../../components/in/mainPage/banner"
import Head from "next/head"
import Container from "/components/in/container"
import SearchField from "../../components/global/searchField"
import { UserContext } from "/utils/contexts/userContext"
import materias from "../../utils/data/materias"
import Link from "next/link"
import DisciplinasFavoritas from "../../components/in/profile/disciplinasFavoritas"

const NUMEROPERGUNTAS = 40
const PERGUNTASPORVEZ = 10

export const getStaticProps = async () => {
    var ObjectId = require('mongodb').ObjectId; 
    const {db} = await connectToDatabase();
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');

    //PEGAR PERGUNTAS
    let perguntas = await colPerguntas.find({}).sort({_id:-1}).limit(NUMEROPERGUNTAS).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {projection: {username: true, foto: true, _id: false}})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    const data = await JSON.stringify(perguntas)
    return {
        props: { questionsJSON: data },
        revalidate: 30
    }
 }

export default function Inicio ({ questionsJSON }) {
    const [questions, setQuestions] = useState(JSON.parse(questionsJSON))
    const [index, setIndex] = useState(PERGUNTASPORVEZ)
    const [mostrar, setMostrar] = useState(true)
    const [showDisc, setShowDisc] = useState(false)
    const USERCONTEXT = useContext(UserContext)

    const manageDisc = (nv) => {
        setShowDisc(nv)
    }

    return (
        <>  
            <Head>
                <title>Eureka</title>
            </Head>
            { showDisc ? 
                <DisciplinasFavoritas user={USERCONTEXT.user[0]} changeDisciplinas={manageDisc} setNewDisciplinas={USERCONTEXT.disciplinas[1]} />
             : null}
            <Container showHeader={true}>
                <div className="flex flex-col gap-6 flex-1">
                    <div className="block lg:hidden font-extrabold text-blue-dark text-4xl">
                        Descubra
                    </div>
                    <Banner/>
                    <SearchField/>
                    {!USERCONTEXT.user[0] ?
                    <div className="lg:hidden flex flex-col gap-4 px-8">
                        <div className="text-blue font-semibold">Faça login ou crie uma conta Eureka para mandar perguntas e respondê-las!</div>
                        <div className="flex justify-around gap-5">
                            <Link passHref href={{pathname: "/cadastro", query: {type: "login"}}}>
                                <button className="bg-white rounded-xl p-2 px-3 font-bold flex-1 hover:bg-grey transition-all">Login</button>
                            </Link>
                            <Link passHref href={{pathname: "/cadastro", query: {type: "cadastro"}}}>
                                <button className="bg-blue text-white p-2 px-3 rounded-xl font-bold flex-1 hover:bg-blue-dark transition-all" >Cadastro</button>
                            </Link>
                        </div>
                    </div> : null}
                    { USERCONTEXT.user[0] ?
                    <div className="flex lg:hidden gap-2 items-center overflow-x-auto w-scrollMaterias">
                        { USERCONTEXT.disciplinas[0] ?
                            USERCONTEXT.disciplinas[0].sort(function(a, b){
                                if(a.firstname < b.firstname) { return -1; }
                                if(a.firstname > b.firstname) { return 1; }
                                return 0;
                            }).map(disc => {
                                function findMateria(element) {
                                    return element.dados[0] == disc
                                }
                                const index = materias.findIndex(findMateria)
                                const nome = materias[index].dados[1]
                                return (
                                    <div key={disc}>
                                    <Link passHref href={"/app/materia/" + disc}>
                                    <div className="bg-yellow-light rounded-full p-3 font-semibold w-auto whitespace-nowrap cursor-pointer">
                                        {nome}
                                    </div>
                                    </Link>
                                    </div>
                                )
                            })
                            : null
                        }
                        <div onClick={() => {setShowDisc(true)}} 
                        className="bg-white border-blue rounded-full p-3 font-bold w-auto whitespace-nowrap cursor-pointer border-1 items-center flex gap-2">
                            <i className="fas fa-plus"></i>
                            <div>Adicione disciplinas favoritas!</div>
                        </div>
                    </div> : null}
                    <div className="flex flex-col gap-5 mb-6">
                        {questions.map((quest, ind) => {
                            return (
                                ind < index ? (
                                <div key={quest._id}>
                                    <Pergunta quest={quest} user={USERCONTEXT.user[0]}/>
                                </div>
                                ) : null
                            )
                        })}
                    </div>
                    { mostrar ?
                    <div onClick={() => {setIndex(index + PERGUNTASPORVEZ); (index + PERGUNTASPORVEZ <= NUMEROPERGUNTAS) ? null : setMostrar(false)}}
                     className="showMore">
                        <div>MOSTRAR MAIS</div> 
                    </div> : null }
                    </div> 
            </Container>
        </>
    )
}