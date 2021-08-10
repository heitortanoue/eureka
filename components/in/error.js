export default function Error ({error, sucess}) {
    return (
        <>
            {error ? 
            <div className={`bg-red-light flex gap-3 p-2 border-2 border-red rounded-xl items-center mb-1`}>
            <i className="far fa-times-circle text-4xl text-red-dark"></i>
            {error}
            </div> : 
            sucess ?
            <div className={`bg-green-light flex gap-3 p-2 border-2 border-green rounded-xl items-center mb-1`}>
                <i className="far fa-check-circle text-4xl text-green-dark"></i>
                Operação concluída! Você será redirecionado(a) em breve
            </div>
            : null}
        </>
    )
}