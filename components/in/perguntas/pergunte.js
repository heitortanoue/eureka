import axios from "axios"
import { useState, useContext } from "react"
import {UserContext} from "/utils/contexts/userContext"
import Error from "/components/in/others/error"
import { useRouter } from "next/router"
import materias from "../../../utils/data/materias"

export default function Pergunte (props) {

    const [texto, setTexto] = useState("")
    const [materia, setMateria] = useState()
    const USERCONTEXT = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [sucess, setSucess] = useState(false)
    const router = useRouter()

    const submitQuestion = () => {
        setLoading(true)
        setTexto("")
        setMateria("")
        const data = {
            texto: texto,
            materia: materia,
            foto: null,
            user: USERCONTEXT.user[0]._id
        }

        axios.post("/api/perguntas/postPergunta", data)
        .then(function (response) {
            if (response.status == 200) {
                setSucess(true)
                setLoading(false)
                router.push("/app/pergunta/" + response.data.id_question)
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
            setError("Pergunta muito pequena! Adicione mais detalhes para que os outros entendam melhor.")
            return
        } else if (lenText > tamMax) {
            setError("Pergunta muito grande! Remova " + (lenText - tamMax) + " caracteres")
            return
        }
        if (!materia) {
            setError("Escolha uma matéria válida!")
            return
        }

        submitQuestion()
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full h-full my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto lg:h-2/3">
                <i onClick={() => {props.onChange(!props.value); setTexto("")}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="font-bold text-xl">Tire sua dúvida</div>
                <Error error={error} sucess={sucess}/>
                {!sucess ?
                <>
                    <div className="w-full h-full relative">
                        <textarea className="inputfieldWhite h-full py-3" placeholder="Escreva sua pergunta aqui!" 
                        onInput={(e) => {setTexto(e.target.value)}} value={texto}/>
                        <div className={`absolute bottom-3 right-4 ${texto.length <= 2000 ? "text-grey" : "text-red"} font-bold`}>{2000 - texto.length}</div>
                    </div>
                    <div className="flex gap-5">
                        <select className="inputfield font-semibold" defaultValue="" onChange={(e) => {setMateria(e.target.value)}}>
                            <option value="" disabled>Escolha a matéria</option>
                            {materias.map(materia => {
                                return(
                                    <option className="text-base text-black" key={materia.dados[0]} value={materia.dados[0]}>{materia.dados[1]}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button onClick={() => {validate()}} className="button blue_button" type="submit">PERGUNTE</button>
                        <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                    </div>
                </>           
                : null}
            </div>
        </div>
    )
}