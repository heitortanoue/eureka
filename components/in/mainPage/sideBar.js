import IconLamp from "/public/logos/icon.png"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"

export default function SideBar ({onChange, user}) {
    const router = useRouter()
    const pageName = router.route
    const paginas = [
        {nome: "Descubra", link: "/app", icon: "fas fa-grip-horizontal"},
        {nome: "Meu Perfil", link: "/app/perfil", icon: "fas fa-user"},
    ]

    return (
        <div className="hidden fixed left-0 h-full w-60 bg-white p-5 lg:flex flex-col justify-between z-40 rounded-2lborders">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between w-full">
                    <Link href="/app">
                        <div className="w-9 cursor-pointer">
                            <Image unsized="true" src={IconLamp} alt="Logo Eureka"/>
                        </div>
                    </Link>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="rounded-full flex items-center gap-3 cursor-pointer p-2 
                    bg-blue font-semibold text-white hover:bg-blue-dark justify-center"
                    onClick={() => {onChange(true)}}>
                        <i className="fas fa-question text-xl"></i>
                        <div>Tire sua dúvida</div>
                    </div>
                    {
                        paginas.map(pg => {
                            return (
                                <div className={`py-1 px-5 rounded-lg cursor-pointer
                                ${pageName == pg.link ? "bg-light-dark text-black" : "text-grey hover:bg-light"}`}
                                key={pg.nome}>
                                    <Link href={pg.link}>
                                        <div className="flex gap-2 items-center">
                                            <i className={`text-xl ${pg.icon}`}></i>
                                            <div className="font-semibold">{pg.nome}</div>
                                        </div>
                                    </Link>
                                </div>
                            )

                        })
                    }
                </div>
                <hr />
                <div>
                    <div className="flex mb-2 justify-between items-center">
                        <div className="font-bold text-xs">DISCIPLINAS FAVORITAS</div>
                        <i className="fas fa-plus text-sm"></i>
                    </div>
                    <div className="flex flex-col gap-2">
                    {user && user.fav_disciplinas ? 
                        user.fav_disciplinas.map(disc => {
                            return (
                                <div className="" key={disc.nome}>
                                    {disc.nome}
                                </div>
                            )
                        })
                    : <div className="text-sm">Adicione suas Disciplinas Favoritas!</div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}