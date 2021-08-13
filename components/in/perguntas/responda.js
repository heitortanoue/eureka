import axios from "axios"
import { useState } from "react"
import Error from "/components/in/others/error"

export default function Responda ({ showAnswering, quest, user, respostas, setRespostas, resps, setResps, onQtdChange }) {
    const [texto, setTexto] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [sucess, setSucess] = useState(false)

    const submitAnswer = () => {
        setLoading(true)
        setTexto("")
        const data = {
            texto: texto,
            foto: null,
            user: user._id,
            id_pergunta: quest._id
        }

        axios.post("/api/comentario/inserirComentario", data)
        .then(function (response) {
            setSucess(true)
            setLoading(false)
            if (response.status == 200) {
                let newComment = response.data.newComment
                newComment["foto"] = user.foto
                newComment["username"] = user.username
                newComment["curtiu"] = false
                let newResps = resps
                newResps.push([])
                setResps(newResps)
                let newRespostas = respostas
                newRespostas.push(newComment)
                setRespostas(newRespostas)
                showAnswering(false)
                onQtdChange(1)
            }
        })
        .catch(function (err) {
            setLoading(false)
        });
    }

    const validate = () => {
        setError(false)
        const tamMin = 20
        const tamMax = 2000
        const lenText = texto.length

        if (lenText < tamMin) {
            setError("Resposta muito pequena! Adicione mais detalhes para que os outros entendam melhor.")
            return
        } else if (lenText > tamMax) {
            setError("Resposta muito grande! Remova " + (lenText - tamMax) + " caracteres")
            return
        }
        submitAnswer()
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full h-full lg:h-auto my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto">
                <i onClick={() => {showAnswering(false)}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red p-2"></i>
                <div className="font-bold text-xl">Responda e ajude <span className="text-blue">{quest.username}</span></div>
                <Error error={error} sucess={sucess}/>
                {!sucess ?
                <>
                    <div className="w-full">
                        <div className="text-blue mb-1 font-bold text-lg">Enunciado:</div>
                        <div className="">{quest.texto}</div>
                    </div>
                    <div className="w-full h-full lg:h-40 relative">
                        <textarea className="inputfieldWhite h-full min-h-64 py-3" placeholder="Escreva sua resposta aqui!" 
                        onInput={(e) => {setTexto(e.target.value)}}/>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button onClick={() => {validate()}} className="button blue_button">RESPONDA</button>
                        <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                    </div>
                </>           
                : null}
            </div>
        </div>
    )
}