import Link from 'next/link'
import Image from 'next/image'
import LogoBranca from '/public/logos/eureka_transparente_branco.png'

export default function Footer () {
    const paginas = [
        {
            nome: "EMPRESA",
            subpaginas: [
                {
                    nome: "Quem Somos",
                    link: "/"
                },
                {
                    nome: "Contato",
                    link: "/"
                },
                {
                    nome: "Blog",
                    link: "/"
                },
            ]
        },
        {
            nome: "AJUDA",
            subpaginas: [
                {
                    nome: "FAQ",
                    link: "/",
                },
                {
                    nome: "Política de Privacidade",
                    link: "/"
                },
                {
                    nome: "Termos de Uso",
                    link: "/"
                }
            ]
        }
    ]

    return (
        <div className="text-white text-sm">
            <div className="bg-blue py-5 md:py-10">
                <div className="container mx-auto p-5 lg:px-10 md:flex md:gap-20">
                    <div className="w-7/12 md:w-1/6 mx-auto ">
                        <Image src={LogoBranca} alt="Logo Eureka"/>
                        <div className="flex justify-evenly text-2xl mt-2">
                            <Link href=""><i className="fab fa-facebook-square cursor-pointer"></i></Link>
                            <Link href=""><i className="fab fa-instagram cursor-pointer"></i></Link>
                            <Link href=""><i className="fab fa-twitter cursor-pointer"></i></Link>
                        </div>
                    </div>
                    <div className="flex flex-1 md:gap-20 mt-8 md:m-0 justify-around md:justify-start">
                    {
                        paginas.map((secao) => 
                            <div key={secao.nome}>
                                <p className="font-bold mb-1 text-lg">{secao.nome}</p>
                                {
                                    secao.subpaginas.map((subp) => 
                                        <p className="hover:underline cursor-pointer" key={subp.nome}><Link href={subp.link}>{subp.nome}</Link></p>
                                    )
                                }
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
            <div className="bg-blue-dark py-2 text-center text-lg font-semibold">
                © 2021 Copyright: Eureka
            </div>
        </div>
    )
}