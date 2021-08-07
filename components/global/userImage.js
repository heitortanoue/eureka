import Image from "next/image"

export default function srcImage ({src}) {
    return (
        <>
            { src ?
                <Image layout="fill" objectFit="contain" src={src} className="rounded-full"/>
                :
                <i className="fas fa-user-circle"></i>
            }
        </>
    )
}