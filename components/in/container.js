import BottomNavbar from "./mainPage/bottomNavbar";
import Pergunte from "./pergunte";
import SearchField from "../global/searchField";
import Header from "./mainPage/header"
import SideBar from "./mainPage/sideBar";
import RightBar from "./mainPage/rightBar";
import { useState, useContext } from "react"
import { UserContext } from "/utils/contexts/userContext"

export default function Container ({children}) {
    const [showAsk, setShowAsk] = useState(false)
    const USERCONTEXT = useContext(UserContext)

    function handleChange(newValue) {
        setShowAsk(newValue);
      }
    return (
        <div className="h-screen">
            <div className={showAsk ? "" : "hidden"}>
                <Pergunte value={showAsk} onChange={handleChange}/>
            </div>
            <SideBar onChange={handleChange} user={USERCONTEXT[0]}/>
            <BottomNavbar onChange={handleChange}>
                <Header/>
                <div className="flex gap-5">
                    {children}
                    <RightBar user={USERCONTEXT[0]}/>
                </div>
            </BottomNavbar>
        </div>
    )
}