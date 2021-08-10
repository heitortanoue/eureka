import { connectToDatabase } from "../../api/connect/mongoUtil"
import { useContext, useEffect, useState } from "react";
import Container from "../../../components/in/container";
import Pergunta from "../../../components/in/perguntas/pergunta";
import Head from "next/head";
import SearchField from "../../../components/global/searchField";
import Resposta from "../../../components/in/perguntas/resposta";
import { UserContext } from "/utils/contexts/userContext"

export const getStaticPaths = async () => {
    const {db} = await connectToDatabase()
    const colPerguntas = db.collection('pergunta');
    const perguntas = await colPerguntas.find({}, {_id: 1}).toArray();
    const paths = perguntas.map(quest => {
        return {
            params: { id: quest._id.toString() }
        }
    })
    return {
        paths: paths,
        fallback: true
    }
}

export const getStaticProps = async (context) => {
    var ObjectId = require('mongodb').ObjectId;
    const {db} = await connectToDatabase()
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');
    const colComentario = db.collection('comentario');
    const colRespComen = db.collection('resposta_comentario');

    const obj_id_question = ObjectId(context.params.id)
    let pergunta = await colPerguntas.findOne({_id: obj_id_question});
    const obj_id_user = await ObjectId(pergunta.id_user)
    const usuario = await colUsuarios.findOne({_id: obj_id_user}, {username: 1, foto: 1})
    pergunta["username"] = await usuario.username
    pergunta["foto"] = await usuario.foto

    let comentarios = await colComentario.find({id_pergunta: context.params.id}).toArray();
    let allResps = []
    for (const quest of comentarios) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto

        let resp_comen = await colRespComen.find({id_comentario: quest._id.toString()}).toArray();
        for (const comen of resp_comen) {
            const obj_id_comen = ObjectId(comen.id_user)
            const obj_comen = await colUsuarios.findOne({_id: obj_id_comen}, {foto: 1})
            comen["foto"] = await obj_comen.foto
        }
        allResps.push(resp_comen)
    }

    const respsJSON = await JSON.stringify(allResps)
    const perguntasJSON = await JSON.stringify(pergunta)
    const comentariosJSON = await JSON.stringify(comentarios)

    return {
        props: { questionJSON: perguntasJSON, answersJSON: comentariosJSON, respsJSON: respsJSON}
    }
}

export default function PaginaPergunta ({ questionJSON, answersJSON, respsJSON }) {
    const [question, setQuestion] = useState(false)
    const [comments, setComments] = useState([])
    const [resps, setResps] = useState([])
    const USERCONTEXT = useContext(UserContext)
    useEffect(() => {
        setQuestion(JSON.parse(questionJSON))
        setComments(JSON.parse(answersJSON))
        setResps(JSON.parse(respsJSON))
    }, [])
    return (
        <>
            <Head>
                <title>{question.texto}</title>
            </Head>
            <Container>
            <div className="w-full flex flex-col gap-5 pb-10 lg:pb-0">
                <SearchField/>
                <div className="p-4 rounded-full flex bg-red">
                    <div className="mx-auto text-3xl font-bold text-white">{question.materia}</div>
                </div>
                <Pergunta quest={question} full={true}/>
                { comments.length > 0 ?
                    <>
                    <div className="font-bold text-blue text-lg">Respostas ({comments.length})</div>
                    {comments.map((com, ind) => {
                        return (
                            <div key={com._id}>
                                <Resposta answer={com} user={USERCONTEXT[0]} resps={resps[ind]}/>
                            </div>
                        )
                    })}
                    </>
                    : 
                    <div className="bg-white text-black p-3 px-5 rounded-full">Não há respostas ainda! Seja o primeiro a responder!</div>    
                }
            </div>
            </Container>
        </>
    )
}

