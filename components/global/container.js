export default function Container ({children, margin}) {
    return (
        <div className={`font-body container mx-auto px-5 lg:px-10 flex flex-col gap-20 ${margin ? "p-5 md:p-10" : ""}`}>
            {children}
        </div>
    )
}