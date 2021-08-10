import { connectToDatabase } from "../../api/connect/mongoUtil"
import { useEffect, useState } from "react";
import Container from "../../../components/in/container";
import Pergunta from "../../../components/in/perguntas/pergunta";
import Head from "next/head";
import SearchField from "../../../components/global/searchField";
import Resposta from "../../../components/in/perguntas/resposta";

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

    const obj_id_question = ObjectId(context.params.id)
    let pergunta = await colPerguntas.findOne({_id: obj_id_question});
    const obj_id_user = await ObjectId(pergunta.id_user)
    const usuario = await colUsuarios.findOne({_id: obj_id_user}, {username: 1, foto: 1})
    pergunta["username"] = await usuario.username
    pergunta["foto"] = await usuario.foto

    const comentarios = await colComentario.find({id_pergunta: context.params.id}).toArray();
    console.log(comentarios)
    for (const quest of comentarios) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }
    const data = await JSON.stringify(pergunta)
    const comentariosJSON = await JSON.stringify(comentarios)

    return {
        props: { questionJSON: data, answersJSON: comentariosJSON}
    }
}

export default function PaginaPergunta ({ questionJSON, answersJSON }) {
    const [question, setQuestion] = useState(false)
    const [comments, setComments] = useState([])
    useEffect(() => {
        setQuestion(JSON.parse(questionJSON))
        setComments(JSON.parse(answersJSON))
    }, [])
    console.log(comments)
    return (
        <>
            <Head>
                <title>{question.texto}</title>
            </Head>
            <Container>
            <div className="w-full flex flex-col gap-5">
                <SearchField/>
                <div className="p-4 rounded-full flex bg-red">
                    <div className="mx-auto text-3xl font-bold text-white">{question.materia}</div>
                </div>
                <Pergunta quest={question} full={true}/>
                { comments.length > 0 ?
                    <>
                    <div className="font-bold text-blue text-lg">Respostas ({comments.length})</div>
                    {comments.map(com => {
                        return (
                            <div key={com._id}>
                                <Resposta answer={com}/>
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

