import Btn from "../buttons"
import Image from 'next/image'
import LogoBranca from '/public/logos/eureka_transparente_branco.png'
import LogoAzul from '/public/logos/eureka_transparente.png'

export default function Header () {
    return (
        <div className="flex flex-col gap-7 lg:flex-row align-middle justify-between lg:container mx-auto lg:px-10 lg:py-10">
            <div className= "flex justify-center p-0 bg-blue lg:bg-transparent py-4 lg:p-0">
                <div className="w-48 lg:hidden">
                    <Image unsized="true" src={LogoBranca} alt="Logo Eureka" className="lg:hidden"/>
                </div>                
                <div className="w-48 hidden lg:block">
                    <Image unsized="true" src={LogoAzul} alt="Logo Eureka" className="lg:hidden"/>
                </div>
            </div>
            <div className="flex justify-center gap-5">
                <Btn label={"Login"} type="grey"/>
                <Btn label={"Pergunte"} type="blue"/>
            </div>
        </div>
    )
}