import Image from "next/image"
import Party from "/public/illustrations/festa.svg"
import Link from "next/link"

export default function Banner () {
    return (
        <a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fwww.facebook.com%2Feureka.app.br" target="_blank">
        <div className="hidden lg:flex justify-between items-center rounded-3xl px-8 gap-5 bg-yellow-light h-40 overflow-visible cursor-pointer">
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
        </a>
    )
}