import { useState } from "react"
import Logout from "/components/in/logout" 
import UserImage from "/components/in/profile/userImage"

export default function RightBar ({user}) {
    const [atual, setAtual] = useState("Resultados")
    const abas = ["Resultados", "Notificações"]
    const temNotificacao = false
    return (
        <div className="hidden lg:block">
            <div className="lg:flex flex-col gap-4 bg-white w-72 rounded-2rborders p-5 pl-6">
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
                                    <p className="font-bold text-2xl text-blue">+34</p>
                                    <p>Lâmpadas</p>
                                    <p>Recebidas</p>
                                </div>
                                <div className="relative w-1/2">
                                    {/*<Image layout="fill" objectFit="contain" src={"/illustrations/meninalampada.png"}></Image>*/}
                                </div>
                            </div>
                            <div className="bg-light-darker rounded-lg w-full pl-2 pr-6 pt-1 flex justify-between">
                                <div className="w-1/2 relative">
                                    {/*<Image layout="fill" objectFit="contain" src={"/illustrations/reiterno.png"}></Image> */}                            
                                </div>
                                <div className="text-right flex-1 pb-3 pt-2">
                                    <p className="font-bold text-2xl text-blue">+14</p>
                                    <p>Melhores</p>
                                    <p>Respostas</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <label className="switch">
                                <input type="checkbox"/>
                                <span className="slider round"></span>
                            </label>
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
            </div>  
        </div>
    )
}