export default function deleteConfirm ({ setConf, showDel, setDel }) {
    return (
        <div className={`w-full font-body ${showDel ? "flex" : "hidden"}`}>
            <div className="bg-white w-full rounded-3xl flex flex-col gap-6 p-4 my-5 border-2 border-red">
                Você tem certeza que deseja apagar esse conteúdo?
                <div className="flex gap-5">
                    <button className="button grey_button" onClick={() => {setDel(false)}}>Voltar</button>
                    <button className="button bg-red text-white" onClick={() => setConf(true)}>CONFIRMAR</button>
                </div>
            </div>
        </div>
    )
}