import Head from "next/head"
import Container from "/components/in/container"
import { useState } from "react"
import axios from "axios"
import { connectToDatabase } from '/pages/api/connect/mongoUtil';
import { useRouter } from "next/router"

export default function Search ({ usuarioJSON, perguntasJSON, respostasJSON }) {
    const [user, setUser] = useState(JSON.parse(usuarioJSON))
    const [questions, setQuestions] = useState(JSON.parse(perguntasJSON))
    const [answer, setAnswer] = useState(JSON.parse(respostasJSON))
    const router = useRouter()
   
    return (
        <>
        <Head>
          <title>Eureka | {user.username}</title>
        </Head>
        <Container>
          <div className="flex flex-col gap-6 flex-1 bg-gradient-to-t from-blue via-red-500 to-blue-light">

          </div>
        </Container>        
        </>
    )
}

export async function getServerSideProps(context) {
    const username = context.query.username
    //var ObjectId = require('mongodb').ObjectId;
    const {db} = await connectToDatabase();
    const colUsuarios = db.collection('usuario');
    const colRespostas = db.collection('comentario');
    const colPerguntas = db.collection('pergunta');
    const resUsuario = await colUsuarios.findOne({username: username}, {projection: {nome: true, username: true, faculdade: true, foto: true}})
    const idUsuario = resUsuario._id.toString()
    const resPerguntas = await colPerguntas.find({id_user: idUsuario}, {projection: {qtd_denuncia: false, foto: false, id_user: false}}).toArray()
    const resRespostas = await colRespostas.find({id_user : idUsuario}, {projection: {_id: false, date: true, texto: true, qtd_reacao: true, id_pergunta: true}}).toArray()
    const usuarioJSON = await JSON.stringify(resUsuario)
    const respostasJSON = await JSON.stringify(resRespostas)
    const perguntasJSON = await JSON.stringify(resPerguntas)
    return { props: { usuarioJSON: usuarioJSON, respostasJSON: respostasJSON, perguntasJSON: perguntasJSON } }
  }