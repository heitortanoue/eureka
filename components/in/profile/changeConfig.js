import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import Error from "../others/error"
import DeleteConfirm from "/components/in/others/deleteConfirm"
import { setCookie } from "../../../utils/cookie"

export default function ChangeProfile ({ user, setUser, closeChangeConfig }) {
    const [senha, setSenha] = useState("")
    const [novaSenha, setNovaSenha] = useState("")
    const [seePassword, setSeePassword] = useState(false)
    const [confirmaSenha, setConfirmaSenha] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [showDelete, setShowDelete] = useState(false)
    const router = useRouter()

    const submitProfile = () => {
        setLoading(true)
        const data = {
            id_user: user._id,
            oldSenha: senha.trim(), 
            newSenha: novaSenha.trim(), }
        axios.post("/api/usuario/changePassword", data)
        .then (function (response) {
            if (response.status == 200) {
                setLoading(false)
                closeChangeConfig(false)
            }
        })
        .catch (function (err) {if (err) {setError(err.response.data.result); setLoading(false)}})
    }

    const deleteProfile = () => {
        axios.post("/api/usuario/deleteUser", {id_user: user._id})
        .then(function (response) {
            if (response.status == 200) {
                sessionStorage.clear('user')
                setCookie("token", "", -1)
                setUser("")
                router.push("/")
            }
        })
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
        <div className="bg-white w-full xl:h-auto my-auto xl:w-5/12 m-2 xl:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative xl:overflow-hidden overflow-y-auto">
            <i onClick={() => {closeChangeConfig(false)}} 
            className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red p-2"></i>
            <div className="font-bold text-xl">Edite sua senha</div>
            <DeleteConfirm setConf={deleteProfile} showDel={showDelete} setDel={setShowDelete}/>
            <Error error={error}/>
            <div className="w-full">
                Senha atual
                <div className="relative">
                <input type={seePassword ? "text" : "password"}  className="inputfield" onChange={(e) => {setSenha(e.target.value)}}/>
                <i className={`p-2 cursor-pointer far fa-eye${!seePassword ? "-slash" : ""} text-xl posIconOlho`}
                onClick={() => {setSeePassword(!seePassword)}}></i>
                </div>
            </div>
            <div className="w-full flex gap-3">
                <div className="flex-1">
                    Nova senha
                    <input type={seePassword ? "text" : "password"}  className="inputfield" onChange={(e) => {setNovaSenha(e.target.value)}}/>
                </div>
                <div className="flex-1">
                    Confirme sua nova senha
                    <div className="relative">
                        <input type={seePassword ? "text" : "password"}
                        className={`inputfield ${novaSenha ? (confirmaSenha == novaSenha ? "inputfieldGreen" : "inputfieldRed") : ''}`} 
                        onChange={(e)=>{setConfirmaSenha(e.target.value)}} />
                        {novaSenha ? <i className={`far fa-${confirmaSenha == novaSenha ? "check" : "times"}-circle
                        text-2xl posIconSenha text-${confirmaSenha == novaSenha ? "green" : "red"}-dark`}></i> : null}
                    </div>
                </div>
            </div>
            <div className="flex gap-4 items-center mt-4 justify-between">
                <button onClick={() => setShowDelete(true)} className="button border-2 border-red h-full hover:bg-red hover:text-white text-red-dark">Apagar conta</button>
                <div className="flex gap-3 items-center">
                    <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                    <button onClick={() => {submitProfile()}} className="button blue_button">Mudar configurações</button>  
                </div>         
            </div>       
        </div>
    </div>
    )
}