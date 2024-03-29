import timeFromPost from "../../../utils/functions/timeFromPost"
import UserImage from "/components/in/profile/userImage"
import Link from "next/link"
import materias from "../../../utils/data/materias"
import axios from "axios"
import { useRouter } from "next/router"
import DeleteConfirm from "../others/deleteConfirm"
import { useState } from "react"
import BannerDisciplina from "../others/bannerDisciplina"
import ZoomablePhoto from "../others/zoomablePhoto"
import Report from "../others/report"

export default function Pergunta ({quest, full, showAnswering, user}) {
    const [showDelete, setShowDelete] = useState(false)
    const [showReport, setShowReport] = useState(false)
    function findMateria(element) {
        return element.dados[0] == quest.materia
    }
    const indMateria = materias.findIndex(findMateria)
    const router = useRouter()
    const delQuestion = async () => {
        // axios.post("/api/aws/s3delete", {path: `imgPergunta/${quest.foto.split('/')[4]}`})
        // .then(function (res) {
            axios.post("/api/perguntas/deletarPergunta", {id: quest._id})
            .then(function (response) {
                if (response.status == 200) {
                    router.push("/app")
                }
            })
        // })
    }
    const manageShowDelete = (newval) => {
        setShowDelete(newval)
    }

    return (
        <>
        {full && showReport ? <Report setReport={setShowReport} id={quest._id} type="pergunta"/> : null}
        {full && quest ?
            <BannerDisciplina nome={quest.materia}/>
        : null}
        <div className="w-full bg-white px-7 py-4 flex flex-col text-black rounded-3xl">
            <div className="flex gap-3">
                <Link passHref href={"/app/usuario?username=" + quest.username}>
                <div className="relative w-10 h-10 cursor-pointer">
                    <UserImage src={quest.foto_user} size={"4xl"}/>
                </div>
                </Link>
                <div className="flex-1 flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="flex gap-3 items-center">
                                    <Link passHref href={"/app/usuario?username=" + quest.username}><div className="text-blue hover:underline font-bold cursor-pointer">{quest.username}</div></Link>
                                    {quest.admin ? <i className="fas fa-crown text-yellow"></i> : null}
                                    <div className="text-cinza text-xs">
                                    {timeFromPost(quest.date)}
                                    </div> 
                                </div>
                            </div>
                            {full ?
                            <div className="flex gap-2">
                            <i className="fas fa-flag red-icon" onClick={() => {setShowReport(true)}}></i>
                             {user && (quest.id_user == user._id.toString() || user.admin) ? <i className="fas fa-trash-alt red-icon" onClick={() => {setShowDelete(true)}}></i> : null} 
                            </div>
                            : null}
                        </div>
                        
                        {!full ?
                        <>
                            <Link passHref href={`/app/pergunta/${quest._id}`}>
                                <div className="font-bold text-lg line-clamp-3 max-h-20 leading-snug hover:underline cursor-pointer">
                                    {quest.texto}
                                </div>
                            </Link>
                            <div className="w-min">
                            <Link passHref href={`/app/materia/${materias[indMateria].dados[0]}`}>
                                <div className={`cursor-pointer whitespace-nowrap py-1 px-2 rounded-full font-bold text-xs transition-all ${materias[indMateria].cor[1] == 0 ? "text-black hover:text-white" : "text-white hover:text-black"}`} style={{backgroundColor: materias[indMateria].cor[0]}}>
                                    {materias[indMateria].dados[1]}
                                </div> 
                            </Link>
                            </div>                

                        </>
                        : null}
                </div>  
            </div>
            {full ? 
            <>
                <div className="mt-4 text-lg">{quest.texto}</div>
                <DeleteConfirm setConf={delQuestion} showDel={showDelete} setDel={manageShowDelete}/>
                {quest.foto ?
                <div className="my-3">
                    <ZoomablePhoto src={quest.foto}/>
                </div>

                 : null}
                {user && quest.id_user != user._id.toString() ?
                <div className={`flex md:justify-end items-end w-full mt-4 ${showDelete ? "hidden" : ""}`}>
                        <button className="button answer_button w-full md:w-80 flex justify-center text-base"
                        onClick={() => showAnswering(true)}>
                            <i className="fas fa-comment-alt"></i>
                            <div>Responda</div>
                        </button>
                </div> : null}
            </>
            :
            <div className="flex justify-between items-center mt-2">
                <div className="flex items-center text-grey">
                    {
                        quest.qtd_respostas > 0 ?
                        <Link passHref href={`/app/pergunta/${quest._id}`}>
                        <div className="flex gap-2 cursor-pointer">
                            <i className="fas fa-comments"></i>
                            <div className="">{quest.qtd_respostas}</div>
                        </div>
                        </Link>
                        : null
                    }
                </div>
                {user && quest.id_user != user._id.toString() ?
                <Link passHref href={{ pathname: `/app/pergunta/${quest._id}`, query: {answer: true} }}>
                    <button className="button answer_button justify-between text-sm">
                        <i className="fas fa-comment-alt"></i>
                        <div>Responda</div>
                    </button>
                </Link>
                : null}
            </div>
            }
        </div>
        </>
    )
}