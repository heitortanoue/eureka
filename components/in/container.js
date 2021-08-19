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

export default function Container ({children, showHeader, hideRightBar}) {
    const [showAsk, setShowAsk] = useState(false)
    const [showChangeFav, setShowChangeFav] = useState(false)
    const [showLog, setShowLog] = useState(false)
    const USERCONTEXT = useContext(UserContext)

    useEffect(() => {
        if (USERCONTEXT.user[0]) {
            USERCONTEXT.disciplinas[1](USERCONTEXT.user[0].fav_disciplinas)
        }
    }, [USERCONTEXT.user[0], USERCONTEXT.disciplinas, USERCONTEXT.user])

    return (
        <div className="h-screen">
            {showLog ? <NotLogged showLog={setShowLog}/> : null}
            {showAsk ? <Pergunte value={showAsk} onChange={setShowAsk}/> : null}
            {showChangeFav ? <DisciplinasFavoritas user={USERCONTEXT.user[0]} changeDisciplinas={setShowChangeFav} setNewDisciplinas={USERCONTEXT.disciplinas[1]} /> : null}        
            <SideBar showLog={setShowLog} onChange={setShowAsk} disciplinas={USERCONTEXT.disciplinas[0]} 
            changeDisciplinas={setShowChangeFav} user={USERCONTEXT.user[0]}/>
            <BottomNavbar onChange={setShowAsk} showLog={setShowLog} user={USERCONTEXT.user[0]}>
                {showHeader ? <Header/> : null}
                <div className="flex gap-5">
                    {children}
                    {!hideRightBar ? <RightBar user={USERCONTEXT.user[0]}/> : null}
                </div>
            </BottomNavbar>
        </div>
    )
}