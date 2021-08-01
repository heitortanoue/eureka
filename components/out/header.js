import Btn from "../buttons"
import Image from 'next/image'
import LogoBranca from '/public/logos/eureka_transparente_branco.png'
import LogoAzul from '/public/logos/eureka_transparente.png'

export default function Header () {
    return (
        <div className="flex flex-col gap-7 md:flex-row align-middle justify-between md:container mx-auto md:px-10 md:py-10">
            <div className= "flex justify-center p-0 bg-blue md:bg-transparent py-4 md:p-0">
                <div className="w-48 md:hidden">
                    <Image unsized="true" src={LogoBranca} alt="Logo Eureka" className="md:hidden"/>
                </div>                
                <div className="w-48 hidden md:block">
                    <Image unsized="true" src={LogoAzul} alt="Logo Eureka" className="md:hidden"/>
                </div>
            </div>
            <div className="flex justify-center gap-5">
                <Btn label={"Login"} type="grey"/>
                <Btn label={"Pergunte"} type="blue"/>
            </div>
        </div>
    )
}