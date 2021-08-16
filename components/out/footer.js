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
                    link: "/quemsomos"
                },
                {
                    nome: "Contato",
                    link: "/contato"
                },
                {
                    nome: "Blog",
                    link: "/blog"
                },
            ]
        },
        {
            nome: "AJUDA",
            subpaginas: [
                {
                    nome: "FAQ",
                    link: "/faq",
                },
                {
                    nome: "Política de Privacidade",
                    link: "/politicadeprivacidade"
                },
                {
                    nome: "Termos de Uso",
                    link: "/termosdeuso"
                }
            ]
        }
    ]

    return (
        <div className="text-white text-sm font-body">
            <div className="bg-blue py-5 md:py-10 md:flex justify-center">
                <div className="mx-auto p-5 lg:px-10 md:flex md:gap-20 md:mx-auto">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                        <Image src={LogoBranca} alt="Logo Eureka" width={300} height={50}/>
                        </div>
                        <div className="flex justify-evenly text-2xl mt-2 w-full">
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/eureka.app.br"><i className="fab fa-facebook-square cursor-pointer"></i></a>
                            <a target="_blank" rel="noreferrer" href="https://instagram.com/eureka.app.br"><i className="fab fa-instagram cursor-pointer"></i></a>
                        </div>
                    </div>
                    <div className="flex md:gap-20 mt-8 md:m-0 justify-around md:justify-start">
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