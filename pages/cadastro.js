import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import IconLamp from "/public/logos/icon.png"
import Head from "next/head"
import Link from "next/link"

export default function Cadastro () {
    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [nomeUsuario, setNomeUsuario] = useState()
    const [faculdade, setFaculdade] = useState()
    const [dataNasc, setDataNasc] = useState()

    const router = useRouter()
    const [isLogin, setLogin] = useState(router.query.type == "login" ? true : false)

    const handleSubmit = (e) => { 
        e.preventDefault()
        let data
        if (isLogin) {
            data = {
                email: email,
                senha: senha
            }
        } else {
            data = {
                email: email,
                senha: senha,
                nome: nome,
                nomeUsuario: nomeUsuario,
                faculdade: faculdade,
                dataNasc: dataNasc
            }
        }
        console.log(data)
    }

    return (
        <>
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
                            {/*PARTE DO LOGIN*/}
                            <div>
                                <div className="font-semibold ml-3">Email</div>
                                <input type="email" name="nome" className="inputfield" onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                            <div>
                                <div className="font-semibold ml-3">Senha</div>
                                <input type="password" name="nome" className="inputfield" onChange={(e)=>{setSenha(e.target.value)}} />
                            </div>
                            {/*FIM DA PARTE DO LOGIN*/}
                            {!isLogin ?
                            <>
                            <div>
                                <div className="font-semibold ml-3">Nome completo</div>
                                <input type="text" name="nome" className="inputfield" onChange={(e)=>{setNome(e.target.value)}} />
                            </div>
                            <div>
                                <div className="font-semibold ml-3">Nome de Usuário</div>
                                <input type="text" name="nome" className="inputfield" onChange={(e)=>{setNomeUsuario(e.target.value)}} />
                            </div>
                            <div className="flex gap-5 justify-between flex-col md:flex-row">
                                <div className="w-full">
                                    <div className="font-semibold ml-3">Universidade</div>
                                    <input type="text" name="nome" className="inputfield" onChange={(e)=>{setFaculdade(e.target.value)}} />
                                </div>
                                <div>
                                    <div className="font-semibold ml-3">Data de Nascimento</div>
                                    <input type="date" name="nome" className="inputfield" onChange={(e)=>{setDataNasc(e.target.value)}} />
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
                            <button onClick={(e) => handleSubmit(e)} className="button blue_button" type="submit">Criar conta</button>
                            <div className="mx-auto">
                                Já tem uma conta? 
                                <a className="text-blue font-semibold cursor-pointer" onClick={() => {setLogin(true)}}> Login</a>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col gap-3">
                            <div className="mx-auto flex items-center gap-2">
                                <input type="checkbox" className="w-4 h-4"/> Mantenha-me conectado
                            </div>
                            <button onClick={(e) => handleSubmit(e)} className="button blue_button" type="submit">Entrar</button>
                            <div className="mx-auto">
                                Não tem uma conta? 
                                <a className="text-blue font-semibold cursor-pointer" onClick={() => {setLogin(false)}}> Cadastre-se</a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}