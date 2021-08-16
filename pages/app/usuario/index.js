import Head from "next/head"
import Container from "/components/in/container"
import { useContext, useEffect, useState } from "react"
import { connectToDatabase } from '/pages/api/connect/mongoUtil';
import { useRouter } from "next/router"
import UserImage from "/components/in/profile/userImage"
import Pergunta from "/components/in/perguntas/pergunta"
import timeFromPost from "../../../utils/functions/timeFromPost";
import Link from "next/link"
import { UserContext } from "/utils/contexts/userContext"
import Loggout from "../../../components/in/logout";
import materias from "../../../utils/data/materias";
import ChangeProfile from "../../../components/in/profile/changeProfile";
import ChangeConfig from "../../../components/in/profile/changeConfig";

export default function PgUsuario ({ usuarioJSON, perguntasJSON, respostasJSON }) {
    const [user, setUser] = useState(JSON.parse(usuarioJSON))
    const [questions, setQuestions] = useState(JSON.parse(perguntasJSON))
    const [answers, setAnswers] = useState(JSON.parse(respostasJSON))
    const [tab, setTab] = useState("Perguntas")
    const [isMyProfile, setIsMyProfile] = useState(false)

    const [showChangeProfile, setShowChangeProfile] = useState(false)
    const [showChangeConfig, setShowChangeConfig] = useState(false)

    const router = useRouter()
    const USERCONTEXT = useContext(UserContext)

    useEffect(() => {
      if (USERCONTEXT.user[0]) {
        const usuario = JSON.parse(usuarioJSON)
        setUser(usuario)
        setQuestions(JSON.parse(perguntasJSON))
        setAnswers(JSON.parse(respostasJSON))
        setIsMyProfile(USERCONTEXT.user[0].username == usuario.username)
      }
    }, [router.asPath, USERCONTEXT.user[0]])

    const abas = ["Perguntas", "Respostas"]
    return (
        <>
        <Head>
          <title>Eureka | {user.username}</title>
        </Head>
        {showChangeProfile && user && isMyProfile ? <ChangeProfile user={user} changeUser={setUser} closeChangeProfile={setShowChangeProfile}/> : null}
        {showChangeConfig && user && isMyProfile ? <ChangeConfig user={user} closeChangeConfig={setShowChangeConfig}/> : null}
        <Container hideRightBar={isMyProfile}>
          <div className="-mx-4 flex flex-col flex-1 lg:flex-row lg:mr-6 lg:ml-0 lg:gap-6 lg:items-start">
            <div className={`flex flex-col p-5 gap-5 items-center lg:justify-between bg-gradient-to-t from-blue to-blue-light lg:sticky lg:top-5
            -mb-8 pb-16 bg-white lg:bg-none ${isMyProfile ? "lg:order-last" : ""} lg:w-72 lg:rounded-3xl lg:p-0 lg:gap-0`}>
                {isMyProfile ? <div className="flex justify-between w-full lg:hidden">
                  <button className="sqr_button grey_button flex" onClick={() => setShowChangeConfig(true)}><i className="fas fa-cog text-xl mx-auto my-auto"/></button>
                  <button className="sqr_button grey_button flex" onClick={() => setShowChangeProfile(true)}><i className="fas fa-pencil-alt text-xl mx-auto my-auto"/></button>
                </div> : null}
                <div className="flex gap-5 items-center lg:hidden -mt-6 pb-4">
                  {user.foto ?
                    <div className="w-28 h-28 relative rounded-full shadow-lg my-auto">
                      <UserImage size="8xl" src={user.foto}/>
                    </div>
                    : 
                    <div className="rounded-full shadow-md my-auto">
                      <i className="fas fa-user-circle text-8xl mx-auto my-auto"></i>
                    </div>
                  }

                <div className="flex flex-col text-white">
                      <div className="font-bold text-lg">{user.nome}</div>
                      <div className="font-semibold">{user.curso}</div>
                      <div className="font-semibold">({user.faculdade})</div>
                      <div className="bg-yellow-light font-bold px-2 w-min text-center mt-2 rounded-lg text-sm text-black">@{user.username}</div>
                  </div>
                </div>
                <div className="font-light text-white max-w-xl lg:hidden px-5">
                    {user.bio}
                  </div>
                <div className="lg:flex gap-5 hidden w-full flex-col pb-5">
                  <div className="bg-gradient-to-t from-blue rounded-t-3xl to-blue-light relative w-full h-32 flex items-end">
                    <div className="mx-auto -mb-8">
                      {user.foto ?
                        <div className="w-32 h-32 relative rounded-full shadow-lg my-auto">
                          <UserImage size="8xl" src={user.foto}/>
                        </div>
                        : 
                        <div className="rounded-full shadow-md my-auto">
                          <i className="fas fa-user-circle text-8xl mx-auto my-auto"></i>
                        </div>
                      }
                    </div>
                  </div>
                  <div className="flex flex-col mt-5 items-center px-5">
                      <div className="font-semibold">{user.nome}</div>
                      <div className="w-min">
                        <div className="bg-yellow-light rounded-lg px-2 text-sm font-bold">@{user.username}</div>
                      </div>
                  </div>
                  <div className="font-light text-white max-w-xl lg:text-black lg:font-medium px-5 text-sm">
                    {user.bio}
                  </div>
                  <div className="flex items-center gap-2 px-5">
                    <i className="fas fa-university text-3xl"></i>
                    <div>
                      <div className="text-blue font-semibold text-sm">{user.curso}</div>
                      <div className="text-sm">{user.faculdade}</div>
                    </div>
                  </div>
                  <div className="mx-5 text-sm">
                    <div className="text-blue font-bold mb-2">Disciplinas Favoritas:</div>
                    <div className="text-xs flex flex-wrap gap-1">
                      {user.fav_disciplinas && user.fav_disciplinas.length > 0 ?
                      user.fav_disciplinas.map(disc => {
                          function findMateria(element) {
                            return element.dados[0] == disc
                        }
                        const indexNome = materias.findIndex(findMateria)
                        return (
                          <div className={`text-center w-min whitespace-nowrap p-1 px-2 rounded-lg ${materias[indexNome].cor[1] == 0 ? "text-black" : "text-white"}`} 
                          style={{backgroundColor: materias[indexNome].cor[0]}} key={disc}>
                            {materias[indexNome].dados[1]}
                            </div>
                        )
                      })                
                      : (<div>O usuário não possui disciplinas favoritas!</div>)}
                      </div>
                  </div>
                  {isMyProfile ? <div className="flex justify-between mx-5 items-center p-1">
                    <i className="fas fa-pencil-alt text-2xl hover:text-blue-dark transition-all cursor-pointer" onClick={() => setShowChangeProfile(true)}></i>
                    <i className="fas fa-cog text-2xl hover:text-blue-dark transition-all cursor-pointer" onClick={() => setShowChangeConfig(true)}></i>
                    <Loggout />
                    </div>
                     : null}
                </div>

              </div>
            <div className="flex flex-col bg-light-darker rounded-2tborders lg:rounded-3xl p-5 lg:p-0 flex-1">
              <div className="w-full flex justify-between">
                <div className="flex gap-2 items-center">
                  {abas.map(aba => {
                    return (
                      <div className={`cursor-pointer rounded-xl py-1 px-2 transition-all 
                      ${tab == aba ? "bg-light-darker text-blue font-bold" : "hover:bg-light"}`} 
                      onClick={() => setTab(aba)} key={aba}>
                        {aba}
                      </div>
                    )
                  })}
                </div>
                <div className="lg:hidden"><Loggout/></div>
              </div>
              <div className="flex flex-col gap-3 mt-3">
                {tab == "Perguntas" ?
                questions.length > 0 ?
                questions.map(quest => {
                  let newQuest = quest
                  newQuest.username = user.username
                  newQuest.foto = user.foto
                  newQuest.id_user = user._id.toString()
                  return (
                    <div key={quest._id}>
                      <Pergunta quest={quest} user={user} full={false}/>
                    </div>
                  )
                }) : (<div className="rounded-3xl bg-white w-full p-5">{isMyProfile ? "Você ainda não fez nenhuma pergunta. Vai lá tirar sua dúvida!" : "Esse usuário não fez nenhuma pergunta!"}</div>)
                : null}
                {tab == "Respostas" ?
                answers.length > 0 ?
                answers.map(ans => {
                  return (
                    <div key={ans._id}>
                      <div className={`bg-white px-7 py-4 flex flex-col text-black rounded-3xl`}>
                        <div className="flex gap-3 items-center">
                          <div className="relative w-10 h-10">
                            <UserImage src={user.foto} size={"4xl"}/>
                          </div>
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-3 items-center">
                                  <div className="text-blue font-bold">{user.username}</div>
                                  <div className="text-cinza text-xs">
                                  {timeFromPost(ans.date)}
                                  </div> 
                              </div>
                              <div className="flex gap-2"></div>      
                            </div>
                          </div>  
                        </div>
                        <Link passHref href={"/app/pergunta/" + ans.id_pergunta}><div className="mt-2 text-lg cursor-pointer hover:underline">{ans.texto}</div></Link>
                        <div className="flex justify-end items-center">
                          <i className={`fas fa-lightbulb text-2xl text-yellow`}></i>
                          <div className="ml-1 text-lg">{ans.qtd_reacao}</div>
                        </div>
                      </div>
                    </div>
                  )
                }) : (<div className="rounded-3xl bg-white w-full p-5">{isMyProfile ? "Você ainda não respondeu nenhuma pergunta. Ajude os outros usuários!" : "Esse usuário ainda não respondeu nenhuma pergunta!"}</div>)
                : null}
              </div>
            </div>
          </div>
        </Container>        
        </>
    )
}

export async function getServerSideProps(context) {
    const username = context.query.username
    const {db} = await connectToDatabase();
    const colUsuarios = db.collection('usuario');
    const colRespostas = db.collection('comentario');
    const colPerguntas = db.collection('pergunta');
    const resUsuario = await colUsuarios.findOne({username: username}, {projection: {nome: true, username: true, faculdade: true, curso:true, bio: true, foto: true, fav_disciplinas: true}})
    const idUsuario = resUsuario._id.toString()
    const resPerguntas = await colPerguntas.find({id_user: idUsuario}, {projection: {qtd_denuncia: false, foto: false, id_user: false}}).sort({_id:-1}).toArray()
    const resRespostas = await colRespostas.find({id_user : idUsuario}, {projection: {date: true, texto: true, qtd_reacao: true, id_pergunta: true}}).sort({_id:-1}).toArray()
    const usuarioJSON = await JSON.stringify(resUsuario)
    const respostasJSON = await JSON.stringify(resRespostas)
    const perguntasJSON = await JSON.stringify(resPerguntas)
    return { props: { usuarioJSON: usuarioJSON, respostasJSON: respostasJSON, perguntasJSON: perguntasJSON } }
  }