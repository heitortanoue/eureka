import { setCookie } from "../../utils/cookie"
import {useRouter} from "next/router"
import { useContext } from "react"
import { UserContext } from "/utils/contexts/userContext"

export default function Loggout () {
    const USERCONTEXT = useContext(UserContext)
    const router = useRouter()

    const manageLogout = () => {
        sessionStorage.clear('user')
        setCookie("token", "", -1)
        USERCONTEXT.user[1]("")
        router.push("/")
    }

    return (
        <i onClick={() => manageLogout()} className="fas fa-sign-out-alt text-2xl cursor-pointer hover:text-red transition-all"></i>
    )
}