import Link from "next/link"
import { useState } from "react"

export default function SearchField () {   
    const [texto, setTexto] = useState("")
    return (
        <div className="bg-white rounded-full">
        <form className="flex align-middle">
            <Link href={{ pathname: `/app/search/`, query: {texto: texto}}} passHref>
                <button type="submit" className="fbg-blue rounded-full cursor-pointer text-white w-10 h-10 flex-0 text-lg">
                    <i className="fa fa-search"></i>
                </button>
            </Link>
            <input type="text" placeholder="Qual a sua pergunta?" value={texto} onChange={(e) => {setTexto(e.target.value)}} className="p-2 flex-1 bg-white rounded-full outline-none"/>
        </form>
        </div>
    )
}