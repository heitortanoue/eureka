import Image from 'next/image'
import Share from "/public/icons/share.svg"
import Btn from "/components/buttons"
import Link from "next/link"

export default function Main () {
    return (
        <div className="flex flex-col gap-10 lg:gap-0">
            <div className="flex flex-row justify-between items-center md:gap-10 lg:gap-0 lg:-mb-12">
                <div className="flex flex-col gap-3 md:w-1/2 lg:mb-20">
                    <div className="text-6xl lg:text-8xl font-extrabold text-blue-dark leading-snug lg:leading-snug">
                        <p>Tire suas</p>
                        <p>Dúvidas</p>
                    </div>
                    <div className="flex flex-row align-middle gap-3">
                        <Image src={Share} alt="Share icon" />
                        <div className="text-black font-semibold lg:text-xl">
                            Compartilhe seu conhecimento  
                            <p className="hidden lg:block"></p> 
                             {" "}com outras pessoas!
                        </div>
                    </div>
                    <div className="flex mt-3 justify-center gap-5 md:hidden">
                        <Btn type="grey" redirect="/login">Login</Btn>
                        <Btn type="blue" redirect="/cadastro">Pergunte</Btn>
                    </div>
                </div>
                <div className="hidden md:flex z-10 md:w-7/12 justify-end relative">
                    <Image width="1000" height="800" src={"/illustrations/study.svg"} alt="Study Illustration"/>
                </div>
            </div>
            <div className="-m-3 mt-1 lg:m-0 lg:bg-light-dark lg:rounded-full">
                <div className="bg-light-darker rounded-full m-1 lg:w-5/12">
                    <form action="get" className="flex align-middle">
                        <button type="submit" className="fbg-blue rounded-full cursor-pointer text-white w-14 h-14 flex-0 text-xl">
                            <i className="fa fa-search"></i>
                        </button>
                        <input type="text" placeholder="Qual a sua pergunta?" className="p-3 flex-1 bg-light-darker rounded-full outline-none"/>
                    </form>
                </div>
            </div>
        </div>
    )
}