import { useEffect, useState } from "react"
import Logout from "/components/in/logout" 
import UserImage from "/components/in/profile/userImage"
import Link from "next/link"
import Image from "next/image"

export default function RightBar ({user}) {
    const [atual, setAtual] = useState("Resultados")
    const [resultados, setResultados] = useState({vitalicio: 0, semanal: 0})
    const abas = ["Resultados", "Notificações"]
    const temNotificacao = false

    useEffect(() => {
        if (user) {
            setResultados(user.resultados)
        }
    }, [user])

    return (
        <div className={`hidden lg:block`}>
            <div className={`lg:flex flex-col gap-4 bg-white w-72 rounded-2rborders p-5 pl-6 ${!user ? "sticky top-8" : null}`}>
                { user ?
                <>
                <div className="flex justify-around transition-all">
                    {
                        abas.map(aba => {
                            return (
                                <div className="flex-col items-center cursor-pointer" onClick={() => setAtual(aba)} key={aba}>
                                    <div className={`relative ${atual == aba ? "text-black font-semibold" : "text-grey"}`}>{aba}</div>
                                    {atual == aba ? 
                                        <div className="bg-yellow h-1 w-full"> </div> 
                                    : null}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    atual == "Resultados" ?
                    <div className="flex flex-col gap-4 px-3">
                        <div className="flex flex-col gap-2 items-center">
                            <div className="text-center text-lg">
                                Olá, <span className="font-bold">{user ? user.username : "usuario"}</span>
                            </div>
                            <div className="w-24 h-24 rounded-full relative">
                            {user ? <UserImage size={"8xl"} src={user.foto}/> : null}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 items-center">
                            <div className="bg-light-darker rounded-lg w-full pt-1 pr-2 pl-6 flex justify-between">
                                <div className="pb-3 pt-2">
                                    <p className="font-bold text-2xl text-blue">+{resultados ? resultados.semanal : null}</p>
                                    <div className="text-sm">
                                    <p>Lâmpadas</p>
                                    <p>(Essa semana)</p>
                                    </div>
                                </div>
                                <div className="relative w-1/2">
                                    <Image alt="Menina com lâmpada" layout="fill" objectFit="contain" src={"/illustrations/meninalampada.svg"}></Image> 
                                </div>
                            </div>
                            <div className="bg-light-darker rounded-lg w-full pl-2 pr-6 pt-1 flex justify-between">
                                <div className="w-1/2 relative">
                                    <Image alt="Menino rei" layout="fill" objectFit="contain" src={"/illustrations/reiterno.svg"}></Image>                            
                                </div>
                                <div className="text-right flex-1 pb-3 pt-2">
                                    <p className="font-bold text-2xl text-blue">+{resultados ? resultados.vitalicio : null}</p>
                                    <div className="text-sm">
                                    <p>Lâmpadas</p>
                                    <p>(Vitalício)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null
                }
                {
                    atual == "Notificações" ?
                    <div className="flex flex-col gap-2">
                        {temNotificacao ?
                        <div>Tem notificações!</div>
                        : 
                        <div>Não há notificações ativas!</div>}
                    </div>
                    : null
                }
                <div className="flex ml-auto">
                    <Logout/>
                </div>
                </>
                : 
                <div className="flex flex-col gap-4">
                <div className="text-blue font-semibold">Faça login ou crie uma conta Eureka para mandar perguntas e respondê-las!</div>
                <div className="flex justify-around gap-5">
                    <Link href={{pathname: "/cadastro", query: {type: "login"}}} passHref>
                        <button className="bg-light-darker rounded-xl p-2 px-3 font-bold flex-1 hover:bg-grey transition-all">Login</button>
                    </Link>
                    <Link href={{pathname: "/cadastro", query: {type: "cadastro"}}} passHref>
                    <button className="bg-blue text-white p-2 px-3 rounded-xl font-bold flex-1 hover:bg-blue-dark transition-all" >Cadastro</button>
                    </Link>
                </div>
            </div>
                }
            </div>  
        </div>
    )
}