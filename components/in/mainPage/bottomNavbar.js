import { useRouter } from "next/router"
import Link from "next/link"
import UserImage from "../profile/userImage"

export default function BottomNavbar ({children, onChange, value, showLog, user}) {
    const router = useRouter()
    const pageName = router.route

    return (
        <>
            <div className="rounded-2borders bg-light-darker lg:hidden fixed top-0 h-body px-4 overflow-y-scroll mb-24 pb-5 w-full">
                {children}
            </div>
            <div className="hidden lg:block bg-light-darker pl-14 py-10 ml-52 min-h-screen">
                {children}
            </div>
            <div className="fixed lg:hidden bg-white bottom-0 h-20 w-full flex justify-around items-center text-4xl mx-auto text-grey">
                <Link href="/app" passHref>
                    <div className="flex flex-col items-center">
                        <i className={`fas fa-grip-horizontal ${pageName == "/app" ? "text-black" : null}`}></i>
                        {pageName == "/app" ? <div className="h-1.5 bg-yellow w-full px-5"></div> : null}
                    </div>
                </Link>
                <div onClick={() => {user ? onChange(!value) : showLog(true)}}
                className="bg-blue rounded-xl bg-blue-op-60 h-14 w-14 flex">
                    <div className="bg-blue h-10 w-10 flex rounded-xl m-auto">
                        <i className="fas fa-question text-3xl m-auto text-white"></i>
                    </div>
                </div>
                {user ?
                <Link href={{pathname: "/app/usuario", query: {username: user.username}}} passHref>
                    <div className="flex flex-col items-center gap-1 cursor-pointer">                       
                        <div className="relative rounded-full w-12 h-12 flex items-center justify-center">
                        <UserImage src={user.foto} size="5xl"/>
                        </div>
                        {pageName == "/app/perfil" ? <div className="h-1.5 bg-yellow w-full px-5"></div> : null}
                    </div>    
                </Link>
                : 
                <div className="flex flex-col items-center gap-1" onClick={() => {showLog(true)}}>

                <i className={`fas fa-user-circle ${pageName == "/app/perfil" ? "text-black" : null}`}></i>
                {pageName == "/app/perfil" ? <div className="h-1.5 bg-yellow w-full px-5"></div> : null}
            </div>  }    
            </div>
        </>
    )
}