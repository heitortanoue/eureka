import IconLamp from "/public/logos/icon.png"
import Image from "next/image"

export default function Header () {
    return (
        <div className="lg:hidden px-5 flex h-20 justify-end gap-3 items-center 
        top-0 z-40">
            <div className="w-11 h-11 mb-2">
                <Image unsized="true" src={IconLamp} alt="Logo Eureka"/>
            </div>
        </div>
    )
}