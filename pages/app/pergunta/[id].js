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
    const usuario = await colUsuarios.findOne({_id: obj_id_user}, {username: 1, foto: 1})
    pergunta["username"] = await usuario.username
    pergunta["foto"] = await usuario.foto

    let comentarios = await colComentario.find({id_pergunta: context.params.id}).toArray();
    let allResps = []
    for (const quest of comentarios) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {username: 1, foto: 1})
        const curtiu = await colComentario.findOne({_id: quest._id}, {"pessoas_curtiram": 1})
        await curtiu.pessoas_curtiram.indexOf(quest.id_user) == -1 ? quest["curtiu"] = false : quest["curtiu"] = true
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
    }, [])

    return (
        <>
            <Head>
                <title>{question.texto}</title>
            </Head>
            {answering ? <Responda quest={question} user={USERCONTEXT[0]} 
            showAnswering={manageResponda} respostas={comments} setRespostas={setRespostas}
            resps={resps} setResps={manageResps} onQtdChange={manageQtd}/> : null}
            <Container>
            <div className="w-full flex flex-col gap-5 pb-10 lg:pb-0">
                <SearchField/>
                {
                    router.isFallback ?
                    <Skeleton />
                    :
                    <>
                    <Pergunta quest={question} full={true} showAnswering={manageResponda} user={USERCONTEXT[0]}/>
                    { comments.length > 0 ?
                        <div>
                        <div className="font-bold text-blue text-lg">Respostas ({qtdComment})</div>
                        <div className="flex flex-col w-full">
                        {comments.map((com, ind) => {
                            return (
                                <div key={com._id}>
                                    <Resposta answer={com} user={USERCONTEXT[0]} resps={resps[ind]} onQtdChange={manageQtd}/>
                                </div>
                            )
                        })}
                        </div>
                        </div>
                        : 
                        <div className="bg-white text-black p-3 px-5 rounded-full">Não há respostas ainda! Seja o primeiro a responder!</div>    
                    }
                    </>
                }
            </div>
            </Container>
        </>
    )
}

