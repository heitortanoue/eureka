import axios from "axios"
import { useState, useContext } from "react"
import {UserContext} from "/utils/contexts/userContext"

export default function Pergunte (props) {
    const materias = [
        ["calculo", "Cálculo"],
        ["fisica", "Física"],
        ["alglin ga", "Álgebra Linear e Geometria Analítica"],
        ["prob est", "Probabilidade e Estatística"],
        ["quimica", "Química"],
        ["calcnumerico", "Cálculo Numérico"],
        ["mec resmat", "Mecânica e Resistência dos Materiais"],
        ["fentrans mecflu transcal transmassa", "FenTrans, MecFlu, TransCal e TransMassa"],
        ["eletrica", "Elétrica"],
        ["operuni", "Operações Unitárias"],
        ["termodinamica", "Termodinâmica"],
        ["ciecmat", "Ciência dos Materiais"],
        ["sistcontrole", "Sistemas de Controle"], 
        ["programacao", "Programação"]
    ]

    const [texto, setTexto] = useState()
    const [materia, setMateria] = useState()
    const [assunto, setAssunto] = useState()
    const USERCONTEXT = useContext(UserContext)
    const [loading, setLoading] = useState(false)

    const submitQuestion = () => {
        setLoading(true)
        const data = {
            texto: texto,
            materia: materia,
            assunto: assunto,
            foto: null,
            user: USERCONTEXT[0]._id
        }

        axios.post("/api/perguntas/postPergunta", data)
        .then(function (response) {
            setLoading(false)
        })
        .catch(function (err) {
            setLoading(false)
        });
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full md:w-2/5 h-96 mx-auto rounded-3xl shadow-lg md:mt-20 flex flex-col gap-6 p-8 relative">
                <i onClick={() => {props.onChange(!props.value)}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="font-bold text-xl">Tire sua dúvida</div>
                <div className="w-full flex-1 relative">
                    <textarea className="inputfieldWhite h-full py-3" placeholder="Escreva sua pergunta aqui!" 
                    onInput={(e) => {setTexto(e.target.value)}}/>
                </div>
                <div className="flex gap-5">
                    <select className="inputfield font-semibold" defaultValue="" onChange={(e) => {setMateria(e.target.value)}}>
                        <option value="" disabled>Escolha a matéria</option>
                        {materias.map(materia => {
                            return(
                                <option className="text-base text-black" key={materia[0]} value={materia[0]}>{materia[1]}</option>
                            )
                        })}
                    </select>
                    <input type="text" className="inputfield" placeholder="Insira palavras-chave sobre o assunto" 
                    onChange={(e) => {setAssunto(e.target.value)}}/>
                </div>
                <div className="flex gap-4 items-center">
                    <button onClick={() => {submitQuestion()}} className="button blue_button">PERGUNTE</button>
                    <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                </div>
            </div>
        </div>
    )
}