import axios from "axios"
import { useState } from "react"
import Error from "./error"

export default function Report ({ setReport, type, id }) {
    const [reason, setReason] = useState("")
    const [error, setError] = useState()
    const [sucess, setSucess] = useState()

    const submitReport = () => {
        setError("")
        if (reason.length == 0) {
            setError("Coloque um motivo")
            return
        }
        const data = {campo: type, id: id, texto: reason}
        axios.post("/api/perguntas/denuncia", data)
        .then (function (response) {
            if (response.status == 200) {
                setSucess("Denúncia enviada com sucesso!")
                setTimeout(setReport(false), 2000)
            }
        })
        .catch (function (error) {
            if (error) {
            setError("A pergunta já foi para análise! Nossa equipe está trabalhando para avaliar essa denúncia.")
        }
        })
    }

    return (
        <>
        <div className="fixed bg-blue-op-60 top-0 left-0 z-50">
            <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
                <div className="bg-white w-full h-full lg:h-auto my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
                shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto">
                <i onClick={() => {setReport(false)}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="font-bold text-blue-dark text-2xl">Faça sua denúncia</div>
                <Error error={error} sucess={sucess}/>
                <div className="flex flex-col">
                    <div className="">Motivo da denúncia</div>
                    <input type="text" className="inputfield" value={reason} onChange={(e) => {setReason(e.target.value)}}/>
                </div>
                <div className="flex justify-end">
                    <button className="button blue_button" onClick={() => submitReport()}>Denunciar</button>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}