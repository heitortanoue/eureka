import Image from "next/image"
import { useState } from "react"

export default function ZoomablePhoto ({ src }) {
    const [onZoom, setOnZoom] = useState(false)

    return (
        <>
        <div className="bg-light-dark rounded-xl py-3 relative">
        <div className="absolute bg-black-op-40 rounded-xl hover:opacity-100 opacity-0 h-full w-full top-0 left-0 transition-all z-10 flex cursor-pointer"
                onClick={() => {setOnZoom(true)}}>
                    <i className="fas fa-search text-white text-xl mx-auto my-auto py-2 px-3 rounded-full bg-blue"></i>
                </div>
            <div className="h-40 w-96 relative mx-auto">
                <Image src={src} objectFit="contain" layout="fill"/>
            </div>
        </div>
        {
            onZoom ?
            <div className="fixed w-screen h-screen bg-black-op-40 z-50 top-0 left-0 flex" onClick={() => setOnZoom(false)}>
            <i onClick={() => {setOnZoom(false)}} 
            className="fas absolute right-5 top-3 fa-times text-2xl cursor-pointer hover:bg-red-dark transition-all text-white bg-red rounded-full px-3 py-1"></i>
                <div className="mx-auto my-auto w-10/12 relative h-3/4">
                    <Image src={src} objectFit="contain" layout="fill"/>
                </div>
            </div>
            : null
        }
        </>
    )
}