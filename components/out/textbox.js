export default function textBox () {
    return (
        <div className="bg-light-dark rounded-3xl flex flex-col lg:flex-row gap-6 p-8 items-center">
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-grey">
                    O QUE É O EUREKA?
                </div>
                <div className="text-blue-dark text-3xl font-extrabold">
                    Plataforma para perguntas de exatas
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-10 h-10 bg-yellow rounded-full text-2xl flex">
                    <i className="fa fa-comments mx-auto my-auto"></i>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <div className="font-semibold text-blue-dark text-lg">
                        Pergunte e responda!
                    </div>
                    <div className="text-grey-dark">
                        Faça perguntas sobre Cálculo, Geometria Analítica, Física e outras matérias! 
                        Receba ajuda e ajude aos outros usuários.
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-10 h-10 bg-yellow rounded-full text-2xl flex">
                    <i className="fa fa-wifi mx-auto my-auto"></i>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <div className="font-semibold text-blue-dark text-lg">
                        Conecte-se com outros!
                    </div>
                    <div className="text-grey-dark">
                        Participe ativamente de nossa comunidade! 
                        Ganhe pontos e medalhas ao responder perguntas.
                    </div>
                </div>
            </div>          
        </div>
    )
}