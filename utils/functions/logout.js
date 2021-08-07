import { setCookie } from "../cookie"
import {useRouter} from "next/router"
import { useContext } from "react"
import { UserContext } from "/utils/contexts/userContext"

export default function Loggout () {
    const USERCONTEXT = useContext(UserContext)
    const router = useRouter()

    const manageLogout = () => {
        sessionStorage.clear('user')
        setCookie("token", "", -1)
        USERCONTEXT[1]("")
        router.push("/")
    }

    return (
        <button className="button grey_button" onClick={() => manageLogout()}>LogOut</button>
    )
}