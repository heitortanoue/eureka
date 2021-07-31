export const BtnCinza = function (props) {
    return (
        <button className="py-2 px-8 font-body font-extrabold bg-light rounded-lg
        border-2 border-light-darker text-blue-dark text-lg hover:bg-light-dark" onClick={() => props.action}>
            {props.label}
        </button>
    )
}

export const BtnAzul = function (props) {
    return (
        <button className="py-2 px-8 font-body font-extrabold bg-blue rounded-lg
        border-2 text-white text-lg hover:bg-blue-dark" onClick={() => props.action}>
            {props.label}
        </button>
    )
}