import { useEffect, useContext } from "react"
import { getCookie } from "./cookie"
import axios from "axios"
import {UserContext} from "/utils/contexts/userContext"
import { useRouter } from "next/router"

export default function RedirectWhenLogged () {
    const USERCONTEXT = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        const token = getCookie("token")
        if (token) {
            axios.post("/api/usuarioLogin", {token: token})
            .then(function (response) {
                USERCONTEXT.user[1](response.data.user)
                router.push("/app")
            })        
        }
        if (USERCONTEXT.user[0]) {
            router.push("/app")
        }
      }, [USERCONTEXT.user[0]])
    
      return (<></>)
}