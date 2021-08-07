import Header from "../components/in/header"
import Image from "next/image"
import Footer from "../components/out/footer"

export default function Inicio ({ questions }) {
    const question = [{
        id: 124812748,
        texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis velit, quis maximus dolor sagittis id. Maecenas ac fermentum erat. Donec lobortis eros id ipsum feugiat, id bibendum arcu dignissim. Phasellus gravida ullamcorper metus, eu molestie enim egestas sed. Integer dictum quam augue, sed suscipit sem semper lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        qtd_reacoes: 12,
        data_post: new Date(),
        materia: "Geometria Analítica", 
        assunto: "Cônicas",
        id_user: 123123123123,
    },{
        id: 124812748,
        texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis velit, quis maximus dolor sagittis id. Maecenas ac fermentum erat. Donec lobortis eros id ipsum feugiat, id bibendum arcu dignissim. Phasellus gravida ullamcorper metus, eu molestie enim egestas sed. Integer dictum quam augue, sed suscipit sem semper lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        qtd_reacoes: 12,
        data_post: new Date(),
        materia: "Geometria Analítica", 
        assunto: "Cônicas",
        id_user: 123123123123,
    },{
        id: 124812748,
        texto: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam interdum felis velit, quis maximus dolor sagittis id. Maecenas ac fermentum erat. Donec lobortis eros id ipsum feugiat, id bibendum arcu dignissim. Phasellus gravida ullamcorper metus, eu molestie enim egestas sed. Integer dictum quam augue, sed suscipit sem semper lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
        qtd_reacoes: 12,
        data_post: new Date(),
        materia: "Geometria Analítica", 
        assunto: "Cônicas",
        id_user: 123123123123,
    },]
    return (
        <div className="bg-light-darker">
            <Header/>
            <div className="flex flex-col mx-5 gap-5 my-7">
                {question.map(quest => {
                    return (
                        <div className="bg-white p-5 flex flex-col gap-3 font-body rounded-3xl shadow-md" key={quest.id}>
                            <div className="flex gap-2 items-center">
                                <div className="relative w-10 h-10">
                                    <Image layout="fill" objectFit="contain" src={`https://avatars.githubusercontent.com/u/68477006?v=4`} 
                                    className="mx-auto my-auto rounded-full" alt="Foto User"/>
                                </div>
                                <div>
                                    <p className="font-bold">NOME</p>
                                    <p className="text-grey text-sm">TEMPO POSTADO</p>
                                </div>
                            </div>
                            <div className="text-justify">
                                {quest.texto}
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="text-blue">
                                    <div className="font-bold">{quest.materia}</div>
                                    <div className="font-semibold">{quest.assunto}</div>
                                </div>
                                <button className="button blue_button">Responda</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer></Footer>
        </div>
    )
}

//export async function getStaticProps () {
//    const questions = await getMoreQuestions(5, 10)
//    return {
//         props: { questions },
//         revalidate: 10
//    }
}
