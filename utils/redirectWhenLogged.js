import { useEffect, useContext } from "react"
import { getCookie } from "./cookie"
import axios from "axios"
import { UserContext } from "/utils/contexts/userContext"
import { useRouter } from "next/router"

export default function RedirectWhenLogged ({ setLoader }) {
    const USERCONTEXT = useContext(UserContext)
    const router = useRouter()
    useEffect(() => {
        const token = getCookie("token")
        if (token) {
            axios.post("/api/usuario/loginToken", {token: token})
            .then(function (response) {
                if (response.status == 200) {
                    USERCONTEXT.user[1](response.data.user)
                    setLoader(false)
                    router.push("/app")
                }
            })        
        }
        if (USERCONTEXT.user[0]) {
            setLoader(false)
            router.push("/app")
        }
      }, [])
    
      return (<></>)
}