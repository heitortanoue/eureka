import { connectToDatabase } from "../../api/connect/mongoUtil"
import { useEffect, useState } from "react";
import Container from "../../../components/in/container";
import Pergunta from "../../../components/in/perguntas/pergunta";
import Head from "next/head";
import SearchField from "../../../components/global/searchField";
import { useRouter } from "next/router";
import materias from "../../../utils/data/materias";
import Banner from "../../../components/in/mainPage/banner";
import BannerDisciplina from "../../../components/in/others/bannerDisciplina";

export const getStaticPaths = async () => {
    const paths = materias.map(mat => {
        return {
            params: { disciplina: mat.dados[0] }
        }
    })
    return {
        paths: paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    var ObjectId = require('mongodb').ObjectId;
    const {db} = await connectToDatabase()
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');

    let perguntas = await colPerguntas.find({ "materia" : context.params.disciplina }).sort({_id:-1}).limit(40).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {projection: {username: true, foto: true, _id: false}})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }
    const perguntasJSON = JSON.stringify(perguntas)
    return {
        props: { questionJSON: perguntasJSON, nome: context.params.disciplina },
        revalidate: 30
    }
}

export default function PaginaMateria ({ questionJSON, nome }) {
    const router = useRouter()
    const [questions, setQuestions] = useState(JSON.parse(questionJSON))
    const [index, setIndex] = useState(10)
    const [mostrar, setMostrar] = useState(true)
    function findMateria(element) {
        return element.dados[0] == nome
    }
    const indexNome = materias.findIndex(findMateria)
    const nomeBonito = materias[indexNome].dados[1]

    useEffect(() => {
        setQuestions(JSON.parse(questionJSON))
        setIndex(questions.length)
        if (questions.length < 10) {
            setMostrar(false)
        }
    }, [nome, questionJSON, questions.length])

    return (
        <>  
            <Head>
                <title>Eureka | {nomeBonito}</title>
            </Head>
            <Container showHeader={true}>
                <div className="flex flex-col gap-6 flex-1">
                    <div className="block lg:hidden font-extrabold text-blue-dark text-4xl">
                        Perguntas
                    </div>
                    <Banner/>
                    <SearchField/>
                    <BannerDisciplina nome={nome}/>            
                    <div className="flex flex-col gap-5 mb-6">
                        {questions.map((quest, ind) => {
                            return (
                                ind < index ? (
                                <div key={quest._id}>
                                    <Pergunta quest={quest}/>
                                </div>
                                ) : null
                            )
                        })}
                    </div>
                    { mostrar ?
                    <div onClick={() => {setIndex(index + 10); (index + 10 <= questions.length) ? null : setMostrar(false)}}
                     className="showMore">
                        <div>MOSTRAR MAIS</div> 
                    </div> : null }
                    </div> 
            </Container>
        </>
    )
}

