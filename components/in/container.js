import BottomNavbar from "./mainPage/bottomNavbar";
import Pergunte from "/components/in/perguntas/pergunte";
import Header from "./mainPage/header"
import SideBar from "./mainPage/sideBar";
import RightBar from "./mainPage/rightBar";
import { useState, useContext, useEffect } from "react"
import { UserContext } from "/utils/contexts/userContext"
import DisciplinasFavoritas from "./profile/disciplinasFavoritas";
import NotLogged from "./others/notLogged"
import axios from "axios";

export default function Container ({children}) {
    const [showAsk, setShowAsk] = useState(false)
    const [showChangeFav, setShowChangeFav] = useState(false)
    const [showLog, setShowLog] = useState(false)
    const USERCONTEXT = useContext(UserContext)

    useEffect(() => {
        if (USERCONTEXT.user[0]) {
            USERCONTEXT.disciplinas[1](USERCONTEXT.user[0].fav_disciplinas)
            axios.post("/api/usuario/resultados", {id_user: USERCONTEXT.user[0]._id})
            .then(function (response) {
               if (response.status == 200) {
                  USERCONTEXT.resultados[1](response.data.res)
               }
            })
        }
    }, [USERCONTEXT.user[0]])

    return (
        <div className="h-screen">
            {showLog ? <NotLogged showLog={setShowLog}/> : null}
            {showAsk ? <Pergunte value={showAsk} onChange={setShowAsk}/> : null}
            {showChangeFav ? <DisciplinasFavoritas user={USERCONTEXT.user[0]} changeDisciplinas={setShowChangeFav} setNewDisciplinas={USERCONTEXT.disciplinas[1]} /> : null}        
            <SideBar showLog={setShowLog} onChange={setShowAsk} disciplinas={USERCONTEXT.disciplinas[0]} 
            changeDisciplinas={setShowChangeFav} user={USERCONTEXT.user[0]}/>
            <BottomNavbar onChange={setShowAsk} showLog={setShowLog}>
                <Header/>
                <div className="flex gap-5">
                    {children}
                    <RightBar user={USERCONTEXT.user[0]} results={USERCONTEXT.resultados[0]}/>
                </div>
            </BottomNavbar>
        </div>
    )
}