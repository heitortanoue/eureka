import Link from "next/link"
export default function NotLogged ({showLog}) {
    return (
        <div className="bg-blue-op-60 flex w-full h-full fixed z-50 font-body">
            <div className="bg-white w-full my-auto md:w-2/5 mx-2 md:mx-auto rounded-3xl shadow-lg md:mt-20 flex flex-col gap-6 p-8 relative">
                <i onClick={() => {showLog(false)}} 
                className="fas absolute right-5 top-3 fa-times text-lg cursor-pointer hover:text-red"></i>
                <div className="text-blue font-semibold">Faça login ou crie uma conta Eureka para mandar perguntas e respondê-las!</div>
                <div className="flex justify-around gap-5">
                    <Link passHref href={{pathname: "/cadastro", query: {type: "login"}}}>
                        <button className="bg-light-darker rounded-xl p-2 px-3 font-bold flex-1 hover:bg-grey transition-all">Login</button>
                    </Link>
                    <Link passHref href={{pathname: "/cadastro", query: {type: "cadastro"}}}>
                    <button className="bg-blue text-white p-2 px-3 rounded-xl font-bold flex-1 hover:bg-blue-dark transition-all" >Cadastro</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}