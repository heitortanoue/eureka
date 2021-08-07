import IconLamp from "/public/logos/icon.png"
import Image from "next/image"

export default function Header () {
    return (
        <div className="p-3 flex h-20 justify-between gap-3 items-center rounded-2borders shadow-md sticky top-0 mb-3 bg-white z-50">
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
            <div className="w-11 h-11 relative">
                <Image layout="fill" objectFit="contain" src={`https://avatars.githubusercontent.com/u/68477006?v=4`} 
                className="mx-auto my-auto rounded-full" alt="Foto User"/>
            </div>
        </div>
    )
}