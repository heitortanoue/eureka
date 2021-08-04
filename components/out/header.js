import Image from 'next/image'
import Link from "next/link"
import IconLamp from '/public/logos/icon.png'
import LogoAzul from '/public/logos/eureka_transparente.png'
import {useState, useEffect} from 'react'

export default function Header () {
    const [isOpen, setOpen] = useState(false)
    const [onTop, setScroll] = useState(true)
    const handleScroll = (e) => {
        const top = window.pageYOffset === 0;
        top ? setScroll(true) : setScroll(false)
    }

    useEffect(() => {
        let interval = setInterval(() => setScroll(window.scrollY), 50);
        return () => clearInterval(interval);
      });

    return (
        <>
            <div className={`sticky top-0 md:static flex gap-7 flex-row z-50 md:bg-white md:shadow-none
            align-middle justify-between items-center container p-5 mx-auto md:p-10 transition-all duration-150
           ${onTop || isOpen ? "bg-light shadow-sm" : "bg-white"}`} onScroll={(e) => {handleScroll(e)}}>
                <div className= "flex justify-center">
                    <Link href="/">
                        <div className="w-12 md:hidden">
                            <Image unsized="true" src={IconLamp} alt="Logo Eureka"/>
                        </div>
                    </Link>  
                    <Link href="/">           
                        <div className="w-48 hidden md:block cursor-pointer">
                            <Image unsized="true" src={LogoAzul} alt="Logo Eureka"/>
                        </div>
                    </Link>  
                </div>
                <div className="justify-center gap-5 hidden md:flex">
                    <Link href={{pathname: "/cadastro", query: {type: "login"}}}><button className="button grey_button">Login</button></Link>
                    <Link href={{pathname: "/cadastro", query: {type: "cadastro"}}}><button className="button blue_button">Cadastro</button></Link>
                </div>
                <div className="text-3xl mr-2 md:hidden" onClick={() => {setOpen(!isOpen)}}>
                    <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
            </div>
            <div className={`z-40 ${isOpen ? "fixed" : "hidden"} w-full h-full bg-white transition-all
            transition-150 p-20`}>
                <div className="font-bold text-blue-dark text-center text-xl mb-5">
                    Entre para a melhor Comunidade de dúvidas de exatas do país!
                </div>
                <div className="justify-center gap-5 flex">
                    <Link href={{pathname: "/cadastro", query: {type: "login"}}}><button className="button grey_button">Login</button></Link>
                    <Link href={{pathname: "/cadastro", query: {type: "cadastro"}}}><button className="button blue_button">Cadastro</button></Link>
                </div>
            </div>
        </>
    )
}