import timeFromPost from "../../../utils/functions/timeFromPost"
import UserImage from "/components/in/profile/userImage"
import Link from "next/link"

export default function Resposta ({ answer }) {

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
            <div className="flex-col mt-3">
                <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 p-1">
                        <UserImage src={answer.foto} size={"3xl"}/>
                    </div>
                    <input type="text" className="inputfieldWhite h-8 text-sm" placeholder="Comente aqui!"/>
                    <button type="submit" className="h-9 py-1 px-4 bg-blue hover:bg-blue-dark transition-all
                     text-white font-bold rounded-lg">Enviar</button>
                </div>
            </div>
        </div>
    )
}