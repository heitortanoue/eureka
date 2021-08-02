import Image from 'next/image'
import { useState } from 'react'

export default function userFeedback () {
    const [index, setIndex] = useState(0)
    const feedbacks = [
        {
            nome: "Usuário 1",
            faculdade: "Faculdade 1",
            texto: "“Nossa, muito legal essa plataforma que o Toi e a Bia criaram! Achei muito incrível, vou usar muito, todos os dias! Por aqui consegui resolver a minha prova inteira de Cálculo I e de Física I, obrigado!”",
            foto: "https://avatars.githubusercontent.com/u/68477006?v=4",
        },
        {
            nome: "Usuário 2",
            faculdade: "Faculdade 2",
            texto: "Esse é o texto do usuário 2",
            foto: "https://avatars.githubusercontent.com/u/68477006?v=4",
        },
        {
            nome: "Usuário 3",
            faculdade: "Faculdade 3",
            texto: "Esse é o texto do usuário 3",
            foto: "https://avatars.githubusercontent.com/u/68477006?v=4",
        },
    ]
    const changeIndex = (num) => {
        const size = feedbacks.length
        let final_index
        if (num > 0) {
            if (index < size - 1) {
                final_index = index + 1
            } else {
                final_index = 0
            }
        } else {
            if (index > 0) {
                final_index = index - 1
            } else {
                final_index = size - 1
            }
        }
        return final_index
    }

    return (
        <div>
            <div className="text-center font-extrabold text-2xl text-blue-dark mb-5">
                Agilize seu aprendizado (e o de outros...)
            </div>
            {/*VERSÃO PARA COMPUTADOR*/}
            <div className="justify-between w-full gap-12 items-stretch hidden lg:flex">
                {feedbacks.map((x) => 
                    <div className="bg-light-dark rounded-3xl flex flex-col lg:flex-row gap-6 p-8 flex-1" key={x.nome}>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <div className="w-12 h-12 flex relative">
                                    <Image layout="fill" objectFit="contain" src={`${x.foto}`} className="mx-auto my-auto rounded-full" alt="Foto User"></Image>
                                </div>
                                <div className="flex flex-col flex-1">
                                    <div className="font-semibold text-blue-dark text-lg">
                                        {x.nome}
                                    </div>
                                    <div className="text-grey-dark">
                                        {x.faculdade}
                                    </div>
                                </div>
                            </div>
                            <div className="text-black">
                                {x.texto}
                            </div>
                        </div>        
                    </div>
                )}
            </div>
            {/*VERSÃO PRA CELULAR*/}
            <div className="block lg:hidden relative">
                <div className="bg-light-dark rounded-3xl p-8 px-10 pb-5">
                    <div className="flex flex-col gap-3 transition-all">
                        <div className="flex gap-3 items-center">
                            <div className="w-12 h-12 flex relative">
                                <Image layout="fill" objectFit="contain" src={`${feedbacks[index].foto}`} className="mx-auto my-auto rounded-full" alt="Foto User"></Image>
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="font-semibold text-blue-dark text-lg">
                                    {feedbacks[index].nome}
                                </div>
                                <div className="text-grey-dark">
                                    {feedbacks[index].faculdade}
                                </div>
                            </div>
                        </div>
                        <div className="text-black text-justify">
                            {feedbacks[index].texto}
                        </div>
                        <div className="mx-auto flex gap-2 mt-2">
                            {feedbacks.map((el, ind) => 
                                <div key={ind} className={`rounded-full w-2 h-2 ${ind == index ? "bg-blue" : "bg-grey"}`} onClick={() => {setIndex(ind)}}>
                                </div>
                            )}
                        </div>
                    </div>        
                </div>
                <div className="top-1/2 absolute -ml-3 bg-blue rounded-full text-white text-2xl p-1 w-9 h-9 flex" onClick={() => {setIndex(changeIndex(-1))}}>
                    <i className="fa fa-chevron-left mx-auto my-auto mr-2"></i>
                </div>
                <div className="top-1/2 right-0 -mr-3 absolute bg-blue rounded-full text-white text-2xl p-1 w-9 h-9 flex" onClick={() => {setIndex(changeIndex(1))}}>
                    <i className="fa fa-chevron-right mx-auto my-auto ml-2"></i>
                </div>
            </div>
        </div>
    )
}