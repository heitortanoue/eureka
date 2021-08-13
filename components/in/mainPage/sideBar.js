import IconLamp from "/public/logos/icon.png"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import materias from "../../../utils/data/materias"

export default function SideBar ({onChange, disciplinas, changeDisciplinas, user, showLog}) {
    const router = useRouter()
    const pageName = router.route
    const paginas = [
        {nome: "Descubra", link: "/app", icon: "fas fa-grip-horizontal"},
        {nome: "Meu Perfil", link: "/app/usuario/" + (user ? user.username : ""), icon: "fas fa-user"},
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
                    onClick={() => {user ? onChange(true) : showLog(true)}}>
                        <i className="fas fa-question text-xl"></i>
                        <div>Tire sua dúvida</div>
                    </div>
                    {
                        paginas.map(pg => {
                            return (
                                <div className={`py-1 px-5 rounded-lg cursor-pointer
                                ${pageName == pg.link ? "bg-light-dark text-black" : "text-grey hover:bg-light"}`}
                                onClick={() => {user ? null : showLog(true)}}
                                key={pg.nome}>
                                    {user ? <Link href={pg.link}>
                                        <div className="flex gap-2 items-center">
                                            <i className={`text-xl ${pg.icon}`}></i>
                                            <div className="font-semibold">{pg.nome}</div>
                                        </div>
                                    </Link> : <div className="flex gap-2 items-center">
                                            <i className={`text-xl ${pg.icon}`}></i>
                                            <div className="font-semibold">{pg.nome}</div>
                                        </div>}
                                </div>
                            )

                        })
                    }
                </div>
                <hr />
                <div>
                    <div className="flex mb-2 justify-between items-center">
                        <div className="font-bold text-xs">DISCIPLINAS FAVORITAS</div>
                        <i className="fas fa-plus text-sm cursor-pointer hover:text-blue transition-all" 
                        onClick={() => {user ? changeDisciplinas(true) : showLog(true)}}></i>
                    </div>
                    <div className="flex flex-col text-sm h-72 overflow-y-auto">
                    {disciplinas ? 
                        disciplinas.sort(function(a, b){
                            if(a.firstname < b.firstname) { return -1; }
                            if(a.firstname > b.firstname) { return 1; }
                            return 0;
                        }).map(disc => {
                            function findMateria(element) {
                                return element.dados[0] == disc
                            }
                            const index = materias.findIndex(findMateria)
                            const nome = materias[index].dados[1]
                            return (
                                <div key={disc}>
                                    <Link href={"/app/materia/" + disc}>
                                    <div className={`flex gap-2 items-center py-2 px-3 cursor-pointer rounded-xl  
                                    ${(router.asPath == "/app/materia/" + disc) ? "bg-light-darker font-bold" : "hover:bg-light"}`} key={disc}>
                                        <Image priority width={20} height={20} src={"/icons/iconsDisciplinas/" + disc + ".png"}/>
                                        <div>{nome}</div>
                                    </div>
                                    </Link>
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