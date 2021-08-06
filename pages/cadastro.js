import { useState, useContext } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import IconLamp from "/public/logos/icon.png"
import Head from "next/head"
import Link from "next/link"
import axios from "axios"
import { setCookie } from "../utils/cookie"
import RedirectWhenLogged from "../utils/redirectWhenLogged"
import {UserContext} from "/utils/contexts/userContext"
import nProgress from "nprogress"

export default function Cadastro () {
    // DADOS PARA CADASTRO E LOGIN
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [confirmaSenha, setConfirmaSenha] = useState()
    const [nomeUsuario, setNomeUsuario] = useState()
    const [faculdade, setFaculdade] = useState()
    const [dataNasc, setDataNasc] = useState()
    const [keepConnect, setKeepConnect] = useState()

    const [error, setError] = useState(false)
    const [seePassword, setSeePassword] = useState(false)
    const USERCONTEXT = useContext(UserContext)

    const router = useRouter()
    const [isLogin, setLogin] = useState(router.query.type == "login" ? true : false)

    const checkFieldAndSubmit = (e) => {
        nProgress.start()
        let inputs, res = true
        if (isLogin) {
            inputs = [email, senha]
        } else {
            inputs = [nome, email, senha, confirmaSenha, nomeUsuario, faculdade, dataNasc]
        }
        if (email && email.search("@") == -1) {
            setError("Verifique o endereço de email!")
            return;
        }
        if (senha && confirmaSenha && senha != confirmaSenha && !isLogin) {
            setError("As senhas não são iguais!")
            return;
        }
        inputs.map((el) => {
            if (!el) {
                setError("Preencha todos os campos!")
                res = false
                nProgress.done()
                return;
            }
        })      
        if (res) {
            handleSubmit(e)
            nProgress.done()
        }
    }

    const handleSubmit = (e) => { 
        e.preventDefault()
        let data = {email: email, senha: senha}
        if (!isLogin) {
            data = {
                email: email,
                senha: senha,
                nome: nome,
                username: nomeUsuario,
                faculdade: faculdade,
                dataNasc: dataNasc
            }
        }
        axios.post(`/api/usuario${isLogin ? "Login" : "Cadastro"}`, data)
        .then(function (response) {
            if (response.status == 200) {
                if (keepConnect) {
                    // COOKIE COM TOKEN PARA MANTER CONECTADO
                    setCookie("token", response.data.user.token, 15)
                }
                USERCONTEXT[1](response.data.user)
            }
        })
        .catch(function (err) {
            if (err.response) {
                setError(err.response.data.result)
            }
        });
    }

    return (
        <>  
            <RedirectWhenLogged/>
            <Head>
                <title>Login/Cadastro | Eureka</title>
            </Head>
            <div className="flex">
                <div className={`hidden lg:flex bg-outro_cinza p-10 w-7/12 
                ${isLogin ? "order-first w-7/12 " : "order-last w-4/12"}`}>
                    <div className="my-auto mx-auto">
                        <Image width={isLogin ? "1000" : "560"} height={isLogin ? "800" : "630"}
                        src={`/illustrations/${isLogin ? "library" : "exam"}.svg`} alt="Study Illustration"/>
                    </div>
                </div>
                <div className={`flex flex-col justify-between h-screen lg:w-5/12
                font-body container mx-auto p-5 lg:p-10 gap-8 lg:m-0 ${isLogin ? "lg:w-5/12" : "lg:w-8/12"}`}>
                    <div className="flex justify-between text-xl items-center">
                        <Link href="/"><button className="sqr_button blue_button"><i className="fas fa-chevron-left"></i></button></Link>
                        <div className="w-12">
                            <Image unsized="true" src={IconLamp} alt="Logo Eureka"/>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 lg:gap-6">
                        <div className="font-extrabold text-4_5xl text-blue-dark">
                            {isLogin ? "Login" : "Cadastro"}
                        </div>
                        <div className="flex flex-col gap-3">
                            {error ? <div className={`bg-red-light flex gap-3 p-2 border-2 border-red rounded-xl items-center mb-1`}>
                                <i className="far fa-times-circle text-4xl text-red-dark"></i>
                                {error}
                            </div> : null}
                            {/*PARTE DO LOGIN*/}
                            <div>
                                <div className="font-semibold ml-3">Email</div>
                                <input type="email" className="inputfield" onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                            <div>
                                <div className="font-semibold ml-3">Senha</div>
                                <div className="relative">
                                    <input type={seePassword ? "text" : "password"} className="inputfield" onChange={(e)=>{setSenha(e.target.value)}} />
                                    <i className={`p-2 cursor-pointer far fa-eye${!seePassword ? "-slash" : ""} text-xl posIconOlho`}
                                    onClick={() => {setSeePassword(!seePassword)}}></i>
                                </div>
                            </div>
                            {/*FIM DA PARTE DO LOGIN*/}
                            {!isLogin ?
                            <>
                            <div>
                                <div className="font-semibold ml-3">Confirme sua senha</div>
                                <div className="relative">
                                    <input type={seePassword ? "text" : "password"} 
                                    className={`inputfield ${senha ? (confirmaSenha == senha ? "inputfieldGreen" : "inputfieldRed") : ''}`} 
                                    onChange={(e)=>{setConfirmaSenha(e.target.value)}} />
                                    {senha ? <i className={`far fa-${confirmaSenha == senha ? "check" : "times"}-circle
                                    text-2xl posIconSenha text-${confirmaSenha == senha ? "green" : "red"}-dark`}></i> : null}
                                </div>
                            </div>
                            <div>
                                <div className="font-semibold ml-3">Nome completo</div>
                                <input type="text" className="inputfield" onChange={(e)=>{setNome(e.target.value)}} />
                            </div>
                            <div>
                                <div className="font-semibold ml-3">Nome de Usuário</div>
                                <input type="text" className="inputfield" onChange={(e)=>{setNomeUsuario(e.target.value)}} />
                            </div>
                            <div className="flex gap-5 justify-between flex-col md:flex-row">
                                <div className="w-full">
                                    <div className="font-semibold ml-3">Universidade</div>
                                    <input type="text" className="inputfield" onChange={(e)=>{setFaculdade(e.target.value)}} />
                                </div>
                                <div>
                                    <div className="font-semibold ml-3">Data de Nascimento</div>
                                    <input type="date" className="inputfield" onChange={(e)=>{setDataNasc(e.target.value)}} />
                                </div>
                            </div>
                            </>
                            : 
                            <div className="font-semibold ml-3 text-blue cursor-pointer">
                                Esqueci minha senha
                            </div>
                            }
                        </div>

                    </div>
                    {
                        !isLogin ?
                        <div className="flex flex-col gap-3">
                            <button onClick={(e) => checkFieldAndSubmit(e)} className="button blue_button" type="submit">Criar conta</button>
                            <div className="mx-auto">
                                Já tem uma conta? 
                                <a className="text-blue font-semibold cursor-pointer" onClick={() => {setLogin(true); setError(false)}}> Login</a>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col gap-3">
                            <div className="mx-auto flex items-center gap-2">
                                <input onChange={(e)=>{setKeepConnect(e.target.value)}} type="checkbox" className="w-4 h-4"/> Mantenha-me conectado
                            </div>
                            <button onClick={(e) => checkFieldAndSubmit(e)} className="button blue_button" type="submit">Entrar</button>
                            <div className="mx-auto">
                                Não tem uma conta? 
                                <a className="text-blue font-semibold cursor-pointer" onClick={() => {setLogin(false); setError(false)}}> Cadastre-se</a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}