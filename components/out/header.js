import {BtnAzul, BtnCinza} from "../buttons"

export default function Header () {
    return (
        <div className="flex flex-col gap-5">
            <div className="bg-blue flex justify-center p-0">
                <img src="/logos/eureka_transparente_branco.png" className="w-48" />
            </div>
            <div className="flex justify-center gap-5">
                <BtnCinza label={"Login"}/>
                <BtnAzul label={"Pergunte"}/>
            </div>
        </div>
    )
}