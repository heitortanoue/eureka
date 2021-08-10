import Image from "next/image"

export default function srcImage ({src, size}) {
    return (
        <>
            { src ?
                <Image layout="fill" objectFit="contain" src={src} className="rounded-full"/>
                :
                <i className={`fas fa-user-circle text-${size}`}></i>
            }
        </>
    )
}