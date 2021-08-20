import { connectToDatabase } from "../../api/connect/mongoUtil"
import { useContext, useEffect, useState } from "react";
import Container from "../../../components/in/container";
import Pergunta from "../../../components/in/perguntas/pergunta";
import Head from "next/head";
import SearchField from "../../../components/global/searchField";
import Resposta from "../../../components/in/perguntas/resposta";
import { UserContext } from "/utils/contexts/userContext"
import { useRouter } from "next/router";
import Skeleton from "../../../components/in/perguntas/skeleton";
import Responda from "../../../components/in/perguntas/responda";

export const getStaticPaths = async () => {
    const {db} = await connectToDatabase()
    const colPerguntas = db.collection('pergunta');
    let perguntas = await colPerguntas.find({}).sort({_id:-1}).limit(20).toArray();
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
    const usuario = await colUsuarios.findOne({_id: obj_id_user}, {projection: {username: true, foto: true, admin: true}})
    pergunta["username"] = await usuario.username
    pergunta["foto_user"] = await usuario.foto
    pergunta["admin"] = await usuario.admin

    let comentarios = await colComentario.find({id_pergunta: context.params.id}).toArray();
    let allResps = []
    for (const quest of comentarios) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {projection: {username: true, foto: true}})
        quest["username"] = await obj.username
        quest["foto_user"] = await obj.foto

        let resp_comen = await colRespComen.find({id_comentario: quest._id.toString()}).toArray();
        for (const comen of resp_comen) {
            const obj_id_comen = ObjectId(comen.id_user)
            const obj_comen = await colUsuarios.findOne({_id: obj_id_comen}, {projection: {foto: true}})
            comen["foto_user"] = await obj_comen.foto
        }
        allResps.push(resp_comen)
    }

    const respsJSON = await JSON.stringify(allResps)
    const perguntasJSON = await JSON.stringify(pergunta)
    const comentariosJSON = await JSON.stringify(comentarios)

    return {
        props: { questionJSON: perguntasJSON, answersJSON: comentariosJSON, respsJSON: respsJSON},
        revalidate: 30
    }
}

export default function PaginaPergunta ({ questionJSON, answersJSON, respsJSON }) {
    const [question, setQuestion] = useState(false)
    const [comments, setComments] = useState([])
    const [resps, setResps] = useState([])
    const USERCONTEXT = useContext(UserContext)
    const router = useRouter()
    const [answering, setAnswering] = useState(router.query.answer)
    const [qtdComment, setQtdComment] = useState(0)

    function manageResponda(newValue) {
        setAnswering(newValue);
    }
    function setRespostas(newValue) {
        setComments(newValue);
    }
    function manageResps (newValue){
        setResps(newValue)
    }
    function manageQtd (inc) {
        inc == -1 ? setQtdComment(qtdComment - 1) : setQtdComment(qtdComment + 1)
    }

    useEffect(() => {
        setQuestion(JSON.parse(questionJSON))
        setComments(JSON.parse(answersJSON))
        setResps(JSON.parse(respsJSON))
        setQtdComment(JSON.parse(answersJSON).length)
    }, [answersJSON, questionJSON, respsJSON])

    return (
        <>
            <Head>
                <title>{question.texto}</title>
            </Head>
            {answering ? <Responda quest={question} user={USERCONTEXT.user[0]} 
            showAnswering={manageResponda} respostas={comments} setRespostas={setRespostas}
            resps={resps} setResps={manageResps} onQtdChange={manageQtd}/> : null}
            <Container showHeader={true}>
            <div className="w-full flex flex-col gap-5 pb-10 lg:pb-0">
                <SearchField/>
                {
                    router.isFallback ?
                    <Skeleton />
                    :
                    <>
                    <Pergunta quest={question} full={true} showAnswering={manageResponda} user={USERCONTEXT.user[0]}/>
                    { comments.length > 0 ?
                        <div>
                        <div className="font-bold text-blue text-lg">Respostas ({qtdComment})</div>
                        <div className="flex flex-col w-full">
                        {comments.map((com, ind) => {
                            return (
                                <div key={com._id}>
                                    <Resposta answer={com} user={USERCONTEXT.user[0]} resps={resps[ind]} onQtdChange={manageQtd}/>
                                </div>
                            )
                        })}
                        </div>
                        </div>
                        : 
                        <div className="bg-white text-black p-3 px-5 rounded-full font-semibold text-center">
                            Não há respostas ainda! 
                            {USERCONTEXT.user[0] && USERCONTEXT.user[0]._id.toString() != question.id_user ? " Seja o primeiro a responder!" : null}
                        </div>    
                    }
                    </>
                }
            </div>
            </Container>
        </>
    )
}

