import Error from "../in/others/error";
import { useState } from "react";
import axios from "axios";

export default function ForgotPassword ({ setShow }) {
    const [error, setError] = useState()
    const [sucess, setSucess] = useState()
    const [emailCadastro, setEmailCadastro] = useState("")
    const [loading, setLoading] = useState(false)

    const sendEmail = (e) => {
        setLoading(true)
        e.preventDefault()
        axios.post("/api/emails/sendConfirmation", {email_usuario: emailCadastro})
        .then (function (response) {
            console.log(response)
            if (response.status == 200) {
                setLoading(false)
                setSucess(true)
                setShow(false)
            }
        })
        .then (function (error) {
            console.log(error)
            if (error) {
                setError(error.response.data.result)
            }
        })
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto">
                <i onClick={() => {setShow(false)}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="font-bold text-xl">Recuperação de Senha</div>
                <Error error={error} sucess={sucess}/>
                <div>Um email de confirmação de identidade será enviado para o endereço de email do campo abaixo, certifique-se que o email inserido é o mesmo utilizado para o cadastro na plataforma.</div>
                <div className="flex-1">
                    <div className="font-semibold ml-3">Email cadastrado</div>
                    <input type="text" className="inputfield" value={emailCadastro} onChange={(e)=>{setEmailCadastro(e.target.value)}} />
                </div>
                <div className="flex gap-4 items-center justify-end">
                        <button onClick={(e) => {sendEmail(e)}} className="button blue_button" type="submit">ENVIAR EMAIL</button>
                        <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                </div>
            </div>
        </div>
    )
}