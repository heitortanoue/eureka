import Image from "next/image"
import Party from "/public/illustrations/festa.svg"

export default function Banner () {
    return (
        <div className="hidden lg:flex justify-between items-center rounded-3xl px-8 gap-5 bg-yellow-light h-40 overflow-visible">
            <div className="flex flex-col gap-2 py-4 w-7/12">
                <div className="font-bold text-3xl">Convide seus colegas!</div>
                <div>
                    Participe da construção de nossa Comunidade convidando
                    novas pessoas para tirar as dúvidas!
                </div>
            </div>
            <div className="flex-1 h-full w-5/12">
                <div className="h-full max-w-lg relative ml-auto hidden xl:block">
                    <Image alt="Ilustração" layout="fill" objectFit="cover" objectPosition="bottom" src={Party}></Image>
                </div>
            </div>
        </div>
    )
}