import { useEffect, useContext } from "react"
import { getCookie } from "./cookie"
import axios from "axios"
import {UserContext} from "/utils/contexts/userContext"
import { useRouter } from "next/router"

export default function RedirectWhenLogged () {
    const userContext = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        const token = getCookie("token")
        if (token) {
            axios.post("/api/usuarioLogin", {token: token})
            .then(function (response) {
                userContext[1](response.data.user)
            })
            router.push("/inicio")
        }
        if (userContext[0]) {
            router.push("/inicio")
        }
      }, [userContext[0]])
    
      return (<></>)
}