export default function Btn (props) {
    let tipo;
    switch (props.type) {
        case "blue":
            tipo = "bg-blue border-blue text-white hover:bg-blue-dark"
            break
        case "grey":
            tipo = "bg-light border-light-darker text-blue-dark hover:bg-light-dark"
            break
        default:
            tipo = "bg-blue border-blue text-white hover:bg-blue-dark"
            break
    }
    return (
        <a href={props.redirect}>
            <button className={`py-2 px-8 font-body font-extrabold rounded-xl border-2 cursor-pointer
            ${tipo}`} onClick={() => props.action}>
                {props.children}
            </button>
        </a>
    )
}