import axios from "axios"
import { useContext, useState } from "react"
import Error from "../others/error"
import UserImage from "./userImage"
import imageCompression from 'browser-image-compression';
import { UserContext } from "/utils/contexts/userContext"

export default function ChangeProfile ({ user, closeChangeProfile, changeUser }) {
    const [faculdade, setFaculdade] = useState(user.faculdade)
    const [curso, setCurso] = useState(user.curso)
    const [bio, setBio] = useState(user.bio)
    const [photo, setPhoto] = useState(user.foto);
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const USERCONTEXT = useContext(UserContext)

    async function onImageChange(event) {
        const imageFile = event.target.files[0];
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        try {
          const compressed = await imageCompression(imageFile, options);
          let reader = new FileReader();
          reader.onload = (e) => {
            setPhoto(e.target.result);
          };
          reader.readAsDataURL(event.target.files[0]);
          setFile(compressed)
        } catch (error) {

        } 
      
      }

    const submitProfile = (imageUrl) => {
        axios.post("/api/usuario/changeProfile", {
            id_user: user._id,
            faculdade: faculdade.trim(), 
            curso: curso.trim(), 
            bio: bio.trim(), 
            foto: imageUrl
        })
        .then (function (response) {
            if (response.status == 200) {
                setLoading(false)
                closeChangeProfile(false)
                const newUser = Object.assign({}, USERCONTEXT.user[0]);
                newUser["faculdade"] = faculdade.trim()
                newUser["curso"] = curso.trim()
                newUser["bio"] = bio.trim()
                newUser["foto"] = imageUrl
                changeUser(newUser)
                sessionStorage.setItem("user", JSON.stringify(newUser))
            }
        })
        .then (function (err) {if (err) {setError(err.data); setLoading(false)}})
    }

    const preSubmit = async () => {
        setLoading(true)
        if (bio.length > 200) {
            setError("A Bio contém muitos caracteres!")
            return;
        }

        if (file) {
            let inputPhoto = user.foto
            let imageUrl = user.foto
            if (user.foto) {
                let n = user.foto.lastIndexOf('/');
                inputPhoto = user.foto.substring(n + 1);
            }
            let url
            axios.post('/api/aws/s3', {link_foto: inputPhoto, path: `imgPerfil/`})
            .then((res) => {
                url = res.data.url
                axios.put(url, file, {headers: {"Content-Type": "multipart/form-data"}})
                .then(function (response) {
                })
                .catch(function (error) {

                })
                imageUrl = url.split('?')[0]
                submitProfile(imageUrl)
            })
            .catch((error) => {
                setError(error); setLoading(false)
            })
        } else {
            submitProfile(user.foto)
        }
        
    }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
        <div className="bg-white w-full h-full lg:h-auto my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto">
            <i onClick={() => {closeChangeProfile(false); setPhoto(null)}} 
            className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red p-2"></i>
            <div className="font-bold text-xl">Edite suas informações</div>
            <Error error={error}/>
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className="w-32 h-32 rounded-full shadow-sm relative"><UserImage src={photo} size={"9xl"}/></div>    
                <label className="custom-file-upload text-blue">
                    <input type="file" accept="image/*" onChange={(e) => {onImageChange(e)}} name="uploaded_file"/>
                    {!photo ? "Alterar foto do perfil" : "Foto selecionada"}
                </label>
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
                <div className="relative h-full">
                    <textarea className="inputfieldWhite h-full min-h-64 min-h-all-32 py-3" placeholder="Escreva algo sobre você" 
                    onInput={(e) => {setBio(e.target.value)}} value={bio}/>
                    <div className={`absolute bottom-3 right-4 ${bio.length <= 200 ? "text-grey" : "text-red"} font-bold`}>{200 - bio.length}</div>
                </div>
            </div>
            <div className="flex gap-4 items-center mt-4 justify-end">
                <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                <button onClick={() => {preSubmit()}} className="button blue_button">Mudar perfil</button>           
            </div>       
        </div>
    </div>
    )
}