import axios from "axios"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "./api/connect/mongoUtil"
import { useState } from "react"
import Header from "../components/out/header"
import Error from "../components/in/others/error"
import Image from "next/image"

export default function EsqueciMinhaSenha ({id_user}) {
    const [seePassword, setSeePassword] = useState(false)
    const [loading, setLoading] = useState(true)
    const [newPass, setNewPass] = useState("")
    const [error, setError] = useState()
    const [sucess, setSucess] = useState()

    const changePassword = (e) => {
        setError(null)
        e.preventDefault()
        setLoading(true)
        axios.post("/api/usuario/changePasswordOut", {id_user: id_user, senha: newPass})
        .then(function (response) {
            if (response.status == 200) {
                setSucess(response.data.result)
                setLoading(false)
            }
        })
        .then(function (error) {
            if (error) {
                setError(error.response.result)
                setLoading(false)
            }          
        })
    }

    return (
        <>
        <Header/>
        { id_user ?
        <div className="p-5 pt-10 flex flex-col gap-8 w-full justify-center lg:container mx-auto lg:px-10 lg:pt-5">
            <div className="font-extrabold text-blue-dark text-4xl flex justify-between">
               <div>Esqueci minha senha</div> 
                <div className="relative h-full w-32 lg:hidden">
                    <Image src="/illustrations/forgotpassword.svg" layout="fill"/>
                </div>
            </div>
            <Error error={error} sucess={sucess}/>
            <div>
                <div className="font-semibold ml-2">Nova senha</div>
                <div className="relative">
                    <input type={seePassword ? "text" : "password"} className="inputfield" onChange={(e)=>{setNewPass(e.target.value)}} />
                    <i className={`p-2 cursor-pointer far fa-eye${!seePassword ? "-slash" : ""} text-xl posIconOlho`}
                    onClick={() => {setSeePassword(!seePassword)}}></i>
                </div>
            </div>
            <div className="w-full">
                <button className="button blue_button w-full flex gap-3 justify-center items-center" onClick={(e) => {changePassword(e)}}>
                    <div>Mudar minha senha</div> 
                    <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-6 w-6`}></div>
                </button>
            </div>
        </div> :
        <div className="flex-auto flex flex-col items-center pb-8 gap-3 px-5">
        <div className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-light via-blue to-blue-dark">TOKEN INVÁLIDO</div>
        <div className="text-xl max-w-screen-md text-center">O código enviado a seu email expirou ou foi digitado incorretamente! Tente novamente.</div>
        <Image alt="Ilustração" priority width={400} height={320} src={"/illustrations/forgotpassword.svg"}></Image>
        </div>
        }
        </> 
    )
}

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase()
    const col = db.collection("hash")
    const res = await col.findOne({_id: ObjectId(context.query.hash)})
    const id_user = res ? res.id_user : null
    return { props: {id_user} }
}