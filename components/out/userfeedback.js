import Image from 'next/image'
import { useState } from 'react'

export default function UserFeedback () {
    const [index, setIndex] = useState(0)
    const feedbacks = [
        {
            nome: "Pedro Torrente",
            faculdade: "Engenharia de Computação (USP São Carlos)",
            texto: `Amo essa plataforma para estudar! 
            Antigamente eu sofria pra achar as respostas dos exercícios da faculdade, mas
            o Eureka conseguiu colocar tudo em um só lugar! 
            Além de ser um ambiente muito interativo, tem uma comunidade sempre pronta pra ajudar. 
            Lugar perfeito para qualquer futuro engenheiro!`,
            foto: "https://avatars.githubusercontent.com/u/83795403?v=4",
        },
        {
            nome: "Kaio Dias",
            faculdade: "Engenharia Agronômica (UFSCar)",
            texto: "A minha experiência com a plataforma foi ótima. No momento em que estamos vivendo, semestres totalmente atípicos e alunos cada vez mais atarefados, uma plataforma que facilita a vida do universitário torna-se necessária, ainda mais quando estamos tratando de perguntas genéricas e específicas com respostas de credibilidade. Irei usar sempre que precisar.",
            foto: "https://eureka-app.s3.sa-east-1.amazonaws.com/caiodias.jpg",
        },
        {
            nome: "Beatriz Cardoso",
            faculdade: "Engenharia de Computação (USP São Carlos)",
            texto: "O Eureka revolucionou a maneira que eu levo minha graduação, antes eu tinha diversas dúvidas e dependia muito dos professores pra sanar elas, o que costumava demorar. Agora eu só preciso postar minha dúvida no site e logo alguém já me dá a resposta para o problema! Completamente impressionada pela qualidade das respostas e do site, muito simples de usar e bem elaborado.",
            foto: "https://avatars.githubusercontent.com/u/81369929?v=4",
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
        <div className="mb-16">
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