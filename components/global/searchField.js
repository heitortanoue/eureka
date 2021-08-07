export default function SearchField () {
    return (
        <form action="get" className="flex align-middle">
            <button type="submit" className="fbg-blue rounded-full cursor-pointer text-white w-14 h-14 flex-0 text-xl">
                <i className="fa fa-search"></i>
            </button>
            <input type="text" placeholder="Qual a sua pergunta?" className="p-3 flex-1 bg-light-darker rounded-full outline-none"/>
        </form>
    )
}