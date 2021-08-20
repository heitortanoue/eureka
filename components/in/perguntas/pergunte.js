import axios from "axios"
import { useState, useContext } from "react"
import {UserContext} from "/utils/contexts/userContext"
import Error from "/components/in/others/error"
import { useRouter } from "next/router"
import materias from "../../../utils/data/materias"
import imageCompression from 'browser-image-compression';

export default function Pergunte (props) {

    const [texto, setTexto] = useState("")
    const [materia, setMateria] = useState()
    const USERCONTEXT = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const [sucess, setSucess] = useState(false)
    const [file, setFile] = useState(null)
    const router = useRouter()

    const validate = () => {
        setError(false)
        const tamMin = 20
        const tamMax = 2000
        const lenText = texto.length

        if (lenText < tamMin) {
            setError("Pergunta muito pequena! Adicione mais detalhes para que os outros entendam melhor.")
            return
        } else if (lenText > tamMax) {
            setError("Pergunta muito grande! Remova " + (lenText - tamMax) + " caracteres")
            return
        }
        if (!materia) {
            setError("Escolha uma matéria válida!")
            return
        }
        sendPhoto()
    }


    const sendPhoto = () => {
        if (file) {
            axios.post('/api/aws/s3', {path: `imgPergunta/`})
            .then((res) => {
                const url = res.data.url
                axios.put(url, file, {headers: {"Content-Type": "multipart/form-data"}})
                .then(function (response) {
                })
                .catch(function (error) {

                })
                const imageUrl = url.split('?')[0]
                submitQuestion(imageUrl)
            })
            .catch((error) => {
                setError(error);
            })
        } else {
            submitQuestion(null)
        }
    }

    const submitQuestion = (imgUrl) => {
        setLoading(true)
        setTexto("")
        setMateria("")
        const data = {
            texto: texto,
            materia: materia,
            foto: imgUrl,
            user: USERCONTEXT.user[0]._id
        }

        axios.post("/api/perguntas/postPergunta", data)
        .then(function (response) {
            if (response.status == 200) {
                setSucess(true)
                setLoading(false)
                router.push("/app/pergunta/" + response.data.id_question)
            }
        })
        .catch(function (err) {
            setLoading(false)
        });
    }

    async function onFileChange(event) {
        const imageFile = event.target.files[0];
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        }
        try {
          const compressed = await imageCompression(imageFile, options);
          let reader = new FileReader();
          reader.readAsDataURL(event.target.files[0]);
          setFile(compressed)
        } catch (error) {

        }     
      }

    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full h-full my-auto lg:w-2/3 m-2 lg:mx-auto rounded-3xl 
            shadow-lg flex flex-col gap-6 p-8 relative lg:overflow-hidden overflow-y-auto lg:h-2/3">
                <i onClick={() => {props.onChange(!props.value); setTexto("")}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="font-bold text-xl">Tire sua dúvida</div>
                <Error error={error} sucess={sucess}/>
                {!sucess ?
                <>
                    <div className="w-full h-full relative">
                        <div id="aloalo"></div>
                        <div className="absolute bg-blue top-0 left-0 rounded-t-md w-full flex px-5 py-1 justify-between items-center text-xl text-white">
                            <div className="flex gap-3 items-center">
                                {/* <div className="font-black p-1 hover:bg-blue-dark rounded-full transition-all cursor-pointer">N</div>
                                <div className="italic p-1 font-bold hover:bg-blue-dark rounded-full transition-all cursor-pointer">I</div>
                                <div className="underline p-1 font-bold hover:bg-blue-dark rounded-full transition-all cursor-pointer">U</div> */}
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="text-sm">{file ? "Foto anexada" : ""}</div>
                                <input type="file" accept="image/*" name="file" id="file" onChange={(e) => onFileChange(e)}/>
                                <label htmlFor="file"><i className="fas fa-paperclip p-1 hover:bg-blue-dark rounded-full transition-all cursor-pointer"></i></label>
                                {file ? <i className="fas fa-trash p-1 hover:bg-blue-dark rounded-full transition-all cursor-pointer" onClick={() => setFile(null)}></i> : null}
                            </div>
                        </div>
                        <textarea className="inputfieldWhite h-full py-3 pt-12" placeholder="Escreva sua pergunta aqui!" 
                        onInput={(e) => {setTexto(e.target.value)}} id="aloalo" />
                        <div className={`absolute bottom-3 right-4 ${texto.length <= 2000 ? "text-grey" : "text-red"} font-bold`}>{2000 - texto.length}</div>
                    </div>
                    <div className="flex gap-5">
                        <select className="inputfield font-semibold" defaultValue="" onChange={(e) => {setMateria(e.target.value)}}>
                            <option value="" disabled>Escolha a matéria</option>
                            {materias.map(materia => {
                                return(
                                    <option className="text-base text-black" key={materia.dados[0]} value={materia.dados[0]}>{materia.dados[1]}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button onClick={() => {validate()}} className="button blue_button" type="submit">PERGUNTE</button>
                        <div className={`${loading ? "block" : "hidden"} loader ease-linear rounded-full border-light-darker h-8 w-8`}/>
                    </div>
                </>           
                : null}
            </div>
        </div>
    )
}