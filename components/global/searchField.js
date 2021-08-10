export default function SearchField () {
    return (
        <div className="bg-white rounded-full">
        <form action="get" className="flex align-middle">
            <button type="submit" className="fbg-blue rounded-full cursor-pointer text-white w-10 h-10 flex-0 text-lg">
                <i className="fa fa-search"></i>
            </button>
            <input type="text" placeholder="Qual a sua pergunta?" className="p-2 flex-1 bg-white rounded-full outline-none"/>
        </form>
        </div>
    )
}