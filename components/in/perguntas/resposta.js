import axios from "axios"
import { useState, useEffect } from "react"
import timeFromPost from "../../../utils/functions/timeFromPost"
import UserImage from "/components/in/profile/userImage"
import DeleteConfirm from "../others/deleteConfirm"

export default function Resposta ({ answer, user, resps, onQtdChange }) {
    const [resp, setResp] = useState("")
    const [fetchResp, setFetchResp] = useState(resps)
    const [liked, setLiked] = useState(false)
    const [likeNumber, setLikeNumber] = useState(answer.qtd_reacao)
    const [deleted, setDeleted] = useState(false)

    const [showDelete, setShowDelete] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)

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

    const manageDelete = (newval) => {
        setDeleteConfirm(newval)
    }
    const manageShowDelete = (newval) => {
        setShowDelete(newval)
    }

    useEffect(() => {
        if (deleteConfirm) {
            delComment()
        }
    }, [deleteConfirm])

    useEffect(() => {
        if (user) {
            axios.post("/api/reacao/checarReacao", {id_comentario: answer._id, id_user: user._id})
            .then (function (response) {
                if (response.status == 200) {
                    setLiked(response.data.res)
                }
            })
        }
    }, [user])

    return (
        <div className={`ml-10 bg-white px-7 mt-4 py-4 flex flex-col text-black rounded-3xl ${deleted ? "hidden" : ""}`}>
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
                            <div className="flex gap-2">  
                                <i className="fas fa-flag red-icon"></i>
                                {user && answer.id_user == user._id.toString() ? <i className="fas fa-trash-alt red-icon" onClick={() => {setShowDelete(true)}}></i> : null} 
                            </div>      
                        </div>
                </div>  
            </div>
            <div className="mt-4 text-lg">{answer.texto}</div>
            <DeleteConfirm setConf={manageDelete} showDel={showDelete} setDel={manageShowDelete}/>
            {!showDelete ? <div className="flex justify-end items-center cursor-pointer" onClick={() => {manageReaction()}}>
                <i className={`fas fa-lightbulb text-2xl ${liked ? "text-yellow animate-bounce-once" : "text-grey"}`}></i>
                <div className="ml-1 text-lg">{likeNumber}</div>
            </div> : null}
            <hr className="border-2 border-light-dark mt-4"/>
            <div className="flex-col mt-3 gap-2 flex">
                {
                    fetchResp.length > 0 ?
                    fetchResp.map(el => {
                        return (
                            <div className="flex items-center gap-3" key={el.texto}>
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
                    <input type="text" value={resp} onChange={(e) => setResp(e.target.value)} className="inputfieldWhite h-8 text-sm" placeholder="Comente aqui!"/>
                    <button type="submit" className="h-9 py-1 px-4 bg-blue hover:bg-blue-dark transition-all
                     text-white font-bold rounded-lg" onClick={() => submitResp()}>Enviar</button>
                </form> : null}
            </div>
        </div>
    )
}