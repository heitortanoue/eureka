import Head from "next/head"
import Container from "../../components/in/container"
import { useEffect, useState } from "react"
import axios from "axios"
import { connectToDatabase } from '/pages/api/connect/mongoUtil';
import Pergunta from "../../components/in/perguntas/pergunta";
import { useRouter } from "next/router"
import SearchField from "../../components/global/searchField";
import Skeleton from "../../components/in/perguntas/skeleton";

export default function Search ({ perguntasJSON }) {
    const [index, setIndex] = useState(10)
    const [mostrar, setMostrar] = useState(JSON.parse(perguntasJSON).length == 10 ? true : false)
    const [questions, setQuestions] = useState(JSON.parse(perguntasJSON))
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const texto = router.query.texto

      useEffect(() => {
        setQuestions(JSON.parse(perguntasJSON))
      }, [perguntasJSON])

    function getMoreSearchQuestions (skip, nquest) {
        setLoading(true)
        axios.post("/api/perguntas/filtroPergunta", {
            skip: skip,
            num_perguntas: nquest,
            frase: texto,
        })
        .then(function (response) {
            if (response.status == 200) {
                setIndex(index + nquest)
                setQuestions([...questions, ...response.data.perguntas])
                if (response.data.perguntas.length < nquest) {
                    setMostrar(false)
                }
                setLoading(false)
            }
        })
        .catch(function (error) {
            setLoading(false)
            setMostrar(false)
        })
    }
   
    return (
        <>
        <Head>
            <title>Eureka</title>
        </Head>
        {router.isFallback ?
        <Skeleton /> :
        <Container>
        <div className="flex flex-col gap-6 flex-1">
            <SearchField/>
            <div>
            <div className="text-blue-dark text-3xl font-bold">Pesquisa</div>
            <div className="text-cinza">A busca por (<span className="font-bold">{texto}</span>) resultou em:</div>
            </div>

            <div className="flex flex-col gap-5 mb-6">
                {questions.map(quest => {
                    return (
                        <div key={quest._id}>
                            <Pergunta quest={quest}/>
                        </div>
                    )
                })}
            </div>
            { mostrar ?
            <div onClick={() => getMoreSearchQuestions(index, 10)} className="showMore">
                <div>MOSTRAR MAIS</div>
                <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-6 w-6`}/>
            </div> : null }
            </div> 
        </Container>        
        }
        </>
    )
}

export async function getServerSideProps(context) {
    const texto = context.query.texto
    var ObjectId = require('mongodb').ObjectId;
    const {db} = await connectToDatabase();
    const colPerguntas = db.collection('pergunta');
    const colUsuarios = db.collection('usuario');
    colPerguntas.createIndex( { "texto": "text" } )
    let perguntas = await colPerguntas.find({ "texto": new RegExp(texto, "gi") } ).sort({_id:-1}).limit(10).toArray();
    for (const quest of perguntas) {
        const obj_id = ObjectId(quest.id_user)
        const obj = await colUsuarios.findOne({_id: obj_id}, {projection: {username: true, foto: true, _id: false}})
        quest["username"] = await obj.username
        quest["foto"] = await obj.foto
    }

    const perguntasJSON = await JSON.stringify(perguntas)
    return { props: { perguntasJSON: perguntasJSON } }
  }