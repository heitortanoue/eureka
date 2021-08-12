export default function Skeleton () {
    return (
        <>
        <div className="w-full bg-white px-7 py-4 flex flex-col text-black rounded-3xl">
                            <div className="animate-pulse">
                            <div className="flex gap-3 items-center">
                                <div className="relative w-10 h-10 rounded-full bg-light-darker"></div>
                                <div className="flex-1 flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3 items-center">
                                                <div className="bg-light-darker h-3 w-40 rounded-full"></div>
                                                <div className="bg-light-darker w-20 h-3 rounded-full"></div> 
                                            </div>                   
                                            <i className="w-6 h-6 rounded-full bg-light-darker"></i>
                                        </div>
                                </div>  
                            </div>
                            <div className="mt-4 bg-light-darker w-full h-32 rounded-xl"></div>
                                <div className={`flex md:justify-end items-end w-full mt-4`}>
                                    <div className="button answer_button h-10 w-full md:w-80 flex justify-center text-base">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ml-10 bg-white px-7 py-4 flex flex-col text-black rounded-3xl">
                            <div className="animate-pulse">
                            <div className="flex gap-3 items-center">
                                <div className="relative w-10 h-10 rounded-full bg-light-darker"></div>
                                <div className="flex-1 flex flex-col gap-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-3 items-center">
                                                <div className="bg-light-darker h-3 w-40 rounded-full"></div>
                                                <div className="bg-light-darker w-20 h-3 rounded-full"></div> 
                                            </div>                   
                                            <i className="w-6 h-6 rounded-full bg-light-darker"></i>
                                        </div>
                                </div>  
                            </div>
                            <div className="mt-4 bg-light-darker w-full h-32 rounded-xl"></div>
                            <hr className="border-2 border-light-darker my-4"/>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8">
                                    <div className="relative w-7 h-7 flex bg-light-darker rounded-full"></div>                                   
                                </div>
                                <div className="w-full h-3 bg-light-darker"></div>
                            </div>
                            </div>
                        </div>
        </> 
    )
}