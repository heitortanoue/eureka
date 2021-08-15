import axios from "axios"
import { useState } from "react"
import Error from "../others/error"
import UserImage from "./userImage"

export default function ChangeProfile ({ user, closeChangeProfile, changeUser }) {
    const [faculdade, setFaculdade] = useState(user.faculdade)
    const [curso, setCurso] = useState(user.curso)
    const [bio, setBio] = useState(user.bio)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()

    const submitProfile = () => {
        setLoading(true)
        if (bio.length > 200) {
            setError("A Bio contém muitos caracteres!")
            return;
        }
        axios.post("/api/usuario/changeProfile", {
            id_user: user._id,
            faculdade: faculdade.trim(), 
            curso: curso.trim(), 
            bio: bio.trim(), 
            foto: user.foto
        })
        .then (function (response) {
            if (response.status == 200) {
                setLoading(false)
                closeChangeProfile(false)
                let newUser = user
                newUser.faculdade = faculdade.trim()
                newUser.curso = curso.trim()
                newUser.bio = bio.trim()
                newUser.foto = user.foto
                changeUser(newUser)
            }
        })
        .then (function (err) {if (err) {setError(err.data)}})
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
        <div className="bg-white w-full h-full lg:h-auto my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto">
            <i onClick={() => {closeChangeProfile(false)}} 
            className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red p-2"></i>
            <div className="font-bold text-xl">Edite suas informações</div>
            <Error error={error}/>
            <div className="flex flex-col gap-2 items-center">
                <div className="w-32 h-32 rounded-full shadow-sm relative"><UserImage src={user.foto} size={"6xl"}/></div>            
                <div className="text-blue cursor-pointer">Alterar foto do perfil</div>
            </div>
            <div className="w-full">
                Faculdade / Universidade
                <input type="text" className="inputfield" value={faculdade} onChange={(e) => {setFaculdade(e.target.value)}}/>
            </div>
            <div className="w-full">
                Curso
                <input type="text" className="inputfield" value={curso} onChange={(e) => {setCurso(e.target.value)}}/>
            </div>
            <div className="w-full h-full lg:h-40 relative">
                Bio
                <div className="relative">
                    <textarea className="inputfieldWhite h-full min-h-64 py-3" placeholder="Escreva algo sobre você" 
                    onInput={(e) => {setBio(e.target.value)}} value={bio}/>
                    <div className={`absolute bottom-3 right-4 ${bio.length <= 200 ? "text-grey" : "text-red"} font-bold`}>{200 - bio.length}</div>
                </div>
            </div>
            <div className="flex gap-4 items-center mt-4 justify-end">
                <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                <button onClick={() => {submitProfile()}} className="button blue_button">Mudar perfil</button>           
            </div>       
        </div>
    </div>
    )
}