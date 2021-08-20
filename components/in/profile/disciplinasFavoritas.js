import { useEffect, useState } from "react";
import materias from "../../../utils/data/materias";
import Image from "next/image";
import axios from "axios";

export default function DisciplinasFavoritas ({ user, changeDisciplinas, setNewDisciplinas }) {
    const [selecionadas, setSelecionadas] = useState([])

    const inputDisciplina = (disc) => {
        const ind = selecionadas.indexOf(disc)
        let copy = [...selecionadas]
        if (ind != -1) {
            copy.splice(ind, 1)
        } else {
            copy.push(disc)
        }
        setSelecionadas(copy)
    }

    const manageDisciplinas = () => {
        axios.post("/api/usuario/addFavMat", { id_user: user._id, fav_disciplinas: selecionadas })
        .then (function (response) {
            if (response.status == 200) {
                changeDisciplinas(false)
                setNewDisciplinas([...selecionadas])
                let cpyUser = user
                user.fav_disciplinas = selecionadas
                sessionStorage.setItem("user", JSON.stringify(cpyUser))
            }
        })
        .then (function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        if (user) {
            setSelecionadas(user.fav_disciplinas)
        }
    }, [user])

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full h-full lg:h-auto my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto">
                <i onClick={() => {changeDisciplinas(false)}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="font-bold text-xl">Diga pra gente quais são suas <span className="text-blue">matérias favoritas</span>!</div>
                <div className="grid-col-1 md:grid-cols-2 xl:grid-cols-3 grid grid-flow-row gap-4">
                        {materias.map((materia) => {
                            const set = selecionadas.indexOf(materia.dados[0]) != -1
                            return(
                                <div className={`hover:bg-blue rounded-xl border-light-darker transition-all cursor-pointer m-0 border-0 relative`}
                                onClick={() => inputDisciplina(materia.dados[0])} key={materia.dados[0]}>
                                    {set ? <i className="fas fa-check-circle text-green-dark absolute z-50 right-0 text-xl -top-2"></i> : null}
                                    <div className="flex items-center p-2 gap-2 transition-all filter inverter border-2 border-light-darker hover:border-yellow rounded-xl font-semibold" 
                                    key={materia.dados[0]}>
                                        <div className="relative"><Image alt="ícone matéria" priority width={24} height={24} src={`/icons/iconsDisciplinas/${materia.dados[0]}.png`}/></div>
                                        <div>{materia.dados[1]}</div>
                                    </div>
                                </div>

                            )
                        })}
                </div>
                <div className="flex justify-end">
                    <button onClick={() => {manageDisciplinas()}} className="button blue_button">Definir</button>
                </div>        
            </div>
        </div>
    )
}