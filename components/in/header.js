import IconLamp from "/public/logos/icon.png"
import Image from "next/image"
import {UserContext} from "/utils/contexts/userContext"
import { useContext } from "react"
import UserImage from "../global/userImage"

export default function Header () {
    const USERCONTEXT = useContext(UserContext)
    return (
        <div className="p-3 flex h-20 justify-between gap-3 items-center rounded-2borders shadow-md sticky top-0 bg-white z-40">
            <div className="w-11 h-11 mb-2">
                <Image unsized="true" src={IconLamp} alt="Logo Eureka"/>
            </div>
            <div className="bg-light-darker rounded-full flex-1 h-10">
                <form action="get" className="flex align-middle">
                <button type="submit" className="fbg-blue rounded-full cursor-pointer text-white w-10 h-10 flex-0 text-lg">
                    <i className="fa fa-search"></i>
                </button>
                <input type="text" placeholder="Qual a sua pergunta?" className="p-2 flex-1 bg-light-darker rounded-full outline-none"/>
                </form>
            </div>
            <div className="w-11 h-11 relative text-4xl my-auto">
                {USERCONTEXT[0] ? <UserImage src={USERCONTEXT[0].foto}/> : null}
            </div>
        </div>
    )
}