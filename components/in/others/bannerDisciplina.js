import materias from "../../../utils/data/materias"
import Image from "next/image"

export default function BannerDisciplina ({nome}) {
    function findMateria(element) {
        return element.dados[0] == nome
    }
    const indexNome = materias.findIndex(findMateria)
    
    return (
         nome ?
       ( <div className={`p-2 flex rounded-full font-bold text-2xl justify-center gap-2 items-center
        ${materias[indexNome].cor[1] == 0 ? "text-black" : "text-white"}`} 
        style={{backgroundColor: materias[indexNome].cor[0] }}>
            <Image alt="Ícone matéria" width={24} height={24} src={"/icons/iconsDisciplinas/" + nome + ".png"} className={`filter  ${materias[indexNome].cor[1] == 0 ? "" : "invert"}`}/>
            <div>{materias[indexNome].dados[1].toUpperCase()}</div>
        </div> )
        : null
    )
}