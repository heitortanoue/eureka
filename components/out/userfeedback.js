import Image from 'next/image'

export default function userFeedback () {
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
    return (
        <div>
            <div className="text-center font-extrabold text-2xl text-blue-dark mb-5">
                Agilize seu aprendizado (e o de outros...)
            </div>
            <div className="flex justify-between w-full gap-12 items-stretch">
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
        </div>
    )
}