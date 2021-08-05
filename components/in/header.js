import IconLamp from "/public/logos/icon.png"
import Image from "next/image"
import SearchField from "../global/searchField"

export default function Header () {
    return (
        <div className="p-5 flex h-20">
            <div className="w-20">
                <Image unsized="true" src={IconLamp} alt="Logo Eureka"/>
            </div>
            <div className="bg-light-darker rounded-full m-1 w-1/2">
                <SearchField/>
            </div>
        </div>
    )
}