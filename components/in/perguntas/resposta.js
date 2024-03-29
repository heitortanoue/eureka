import axios from "axios"
import { useState, useEffect } from "react"
import timeFromPost from "../../../utils/functions/timeFromPost"
import UserImage from "/components/in/profile/userImage"
import DeleteConfirm from "../others/deleteConfirm"
import Link from "next/link"
import Report from "../others/report"

export default function Resposta ({ answer, user, resps, onQtdChange }) {
    const [resp, setResp] = useState("")
    const [fetchResp, setFetchResp] = useState(resps)
    const [liked, setLiked] = useState(false)
    const [likeNumber, setLikeNumber] = useState(answer.qtd_reacao)
    const [deleted, setDeleted] = useState(false)

    const [showDelete, setShowDelete] = useState(false)
    const [showReport, setShowReport] = useState(false)

    const manageReaction = () => {
        let data = {
            id_user: user._id,
            id_comentario: answer._id,
        }
        axios.post("/api/reacao/manageLikeComen", data)
        .then (function (response) {
            setLiked(response.data.res)
            response.data.res ? setLikeNumber(likeNumber + 1) : setLikeNumber(likeNumber - 1)
        })
        .then (function (error) {
        })
    }

    const delComment = () => {
        axios.post("/api/comentario/deletarComentario", {id: answer._id})
        .then(function (response) {
            if (response.status == 200) {
                setDeleted(true)
                onQtdChange(-1)
            }
        })
    }

    const submitResp = (e) => {
        e.preventDefault()
        if (resp.length > 200) {return}
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

    const manageShowDelete = (newval) => {
        setShowDelete(newval)
    }

    useEffect(() => {
        if (user) {
            axios.post("/api/reacao/checarReacao", {id_comentario: answer._id, id_user: user._id})
            .then (function (response) {
                if (response.status == 200) {
                    setLiked(response.data.res)
                }
            })
        }
    }, [user, answer])

    return (
        <>
        {showReport ? <Report setReport={setShowReport} id={answer._id} type="comentario"/> : null}
        <div className={`ml-10 bg-white px-7 mt-4 py-4 flex flex-col text-black rounded-3xl ${deleted ? "hidden" : ""}`}>
            <div className="flex gap-3 items-center">
                <Link href={`/app/usuario?username=${answer.username}`} passHref>
                    <div className="relative w-10 h-10 cursor-pointer">
                        <UserImage src={answer.foto_user} size={"4xl"}/>
                    </div>
                </Link>
                <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-3 items-center">
                                <Link href={`/app/usuario?username=${answer.username}`} passHref>
                                <div className="text-blue font-bold cursor-pointer hover:underline">{answer.username}</div>
                                </Link>
                                <div className="text-cinza text-xs">
                                {timeFromPost(answer.date)}
                                </div> 
                            </div>
                            <div className="flex gap-2">  
                                <i className="fas fa-flag red-icon" onClick={() => setShowReport(true)}></i>
                                {user && (answer.id_user == user._id.toString() || user.admin) ? <i className="fas fa-trash-alt red-icon" onClick={() => {setShowDelete(true)}}></i> : null} 
                            </div>      
                        </div>
                </div>  
            </div>
            <div className="mt-4 text-lg">{answer.texto}</div>
            <DeleteConfirm setConf={delComment} showDel={showDelete} setDel={manageShowDelete}/>
            {!showDelete ? <div className="flex justify-end">
                <div onClick={() => {user && answer.id_user == user._id.toString() ? null : manageReaction()}} className={`flex items-center ${user && answer.id_user == user._id.toString() ? null : "cursor-pointer"}`}>
                <i className={`fas fa-lightbulb text-2xl ${liked ? "text-yellow animate-bounce-once" : "text-grey"}`}></i>
                <div className="ml-1 text-lg">{likeNumber}</div>
                </div>
            </div> : null}
            <hr className="border-2 border-light-dark mt-4"/>
            <div className="flex-col mt-3 gap-2 flex">
                {
                    fetchResp.length > 0 ?
                    fetchResp.map(el => {
                        return (
                            <div className="flex items-center gap-3 break-all" key={el.texto}>
                                <div className="w-7 h-7">
                                    <div className="relative w-6 h-6 flex">
                                        <UserImage src={el.foto} size={"2xl"}/>
                                    </div>                                   
                                </div>
                                {el.texto}
                            </div>
                        )
                    })
                    : null
                }
                {user ?
                <form className="flex items-center gap-3">
                    <div className="w-8 h-8">
                        <div className="relative flex w-7 h-7">
                            <UserImage src={user.foto} size={"3xl"}/>
                        </div>
                    </div>
                    <div className="relative w-full">
                        <input type="text" value={resp} onChange={(e) => setResp(e.target.value)} className="inputfieldWhite h-8 text-sm pr-5" placeholder="Comente aqui!"/>
                        <div className={`absolute bottom-1.5 right-2 ${resp.length <= 200 ? "text-grey" : "text-red"} font-bold bg-light-darker pl-2 text-sm`}>{200 - resp.length}</div>
                    </div>
                    <button type="submit" className="h-9 py-1 px-4 bg-blue hover:bg-blue-dark transition-all
                     text-white font-bold rounded-lg" onClick={(e) => submitResp(e)}>Enviar</button>
                </form> : null}
            </div>
        </div>
        </>
    )
}