import Image from "next/image"

export default function Soon () {
    return (
        <div className="flex-auto flex flex-col items-center pb-8 gap-3 px-5">
            <div className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-light via-blue to-blue-dark">EM BREVE</div>
            <div className="text-xl max-w-screen-md text-center">A equipe do Eureka está planejando grandes novidades por aqui! Fique atento às nossas redes sociais para ficar por dentro!</div>
            <Image priority width={400} height={320} src={"/illustrations/buildsite.svg"}></Image>
        </div>
    )
}