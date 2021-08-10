import axios from "axios"
import { useEffect, useState } from "react"
import timeFromPost from "../../../utils/functions/timeFromPost"
import UserImage from "/components/in/profile/userImage"

export default function Resposta ({ answer, user, resps }) {
    const [resp, setResp] = useState("")
    const [fetchResp, setFetchResp] = useState(resps)

    const submitResp = () => {
        const data = {
            user: user._id,
            texto: resp,
            id_comentario: answer._id,
        }
        axios.post("/api/comentario/inserirRespComen", data)
        .then(function (response) {
            let newArr = fetchResp
            newArr.push({texto: resp, foto: user.foto})
            setFetchResp(newArr)
            setResp("")
        })
        .then(function (error) {

        })
    }

    return (
        <div className="ml-10 bg-white px-7 py-4 flex flex-col text-black rounded-3xl">
            <div className="flex gap-3 items-center">
                <div className="relative w-10 h-10">
                    <UserImage src={answer.foto} size={"4xl"}/>
                </div>
                <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-3 items-center">
                                <div className="text-blue font-bold">{answer.username}</div>
                                <div className="text-cinza text-xs">
                                {timeFromPost(answer.date)}
                                </div> 
                            </div>                   
                            <i className="fas fa-flag 2xl text-grey rounded-full hover:bg-red hover:text-white p-2 transition-all cursor-pointer"></i>
                        </div>
                </div>  
            </div>
            <div className="mt-4 text-lg">{answer.texto}</div>
            <hr className="border-2 border-light-dark mt-4"/>
            <div className="flex-col mt-3 gap-2 flex">
                {
                    fetchResp.length > 0 ?
                    fetchResp.map(el => {
                        return (
                            <div className="flex items-center gap-3" key={el.texto}>
                                <div className="relative w-6 h-6 p-1">
                                    <UserImage src={el.foto} size={"3xl"}/>
                                </div>
                                {el.texto}
                            </div>
                        )
                    })
                    : null
                }
                <div className="flex items-center gap-3">
                    <div className="relative w-6 h-6 p-1">
                        <UserImage src={answer.foto} size={"3xl"}/>
                    </div>
                    <input type="text" value={resp} onChange={(e) => setResp(e.target.value)} className="inputfieldWhite h-8 text-sm" placeholder="Comente aqui!"/>
                    <button type="submit" className="h-9 py-1 px-4 bg-blue hover:bg-blue-dark transition-all
                     text-white font-bold rounded-lg" onClick={() => submitResp()}>Enviar</button>
                </div>
            </div>
        </div>
    )
}