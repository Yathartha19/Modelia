"use client"

import useSidebarStates from "../app/store/store"

import { 
    FileUp,
    Wrench,
 } from "lucide-react"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function Chat() {

    const { setChat, setParameters, chatBox, Download, Console, Logs } = useSidebarStates()

    const toParameters = () => {
        setChat(false)
        setParameters(true)
    }

    return (
        <div className="relative h-full flex-1 rounded-xl bg-muted/50">
        
        {chatBox ?
            <>
                <div>
                    
                </div>
                <div className="flex flex-col items-center justify-between absolute bottom-4 left-4 right-4 bg-[#030816] border border-accent rounded-2xl h-[7.5rem]">
                    <div className="w-full">
                    <textarea
                        className="w-full h-[6vh] pt-2 px-6 mt-2 rounded-lg bg-transparent text-white focus:outline-none resize-none"
                        placeholder="Enter your prompt here..."
                    ></textarea>
                    </div>
                    <div className="w-full px-5 mb-3 flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center justify-center gap-3">
                            <FileUp />
                            <Wrench onClick={toParameters} className="hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
                        </div>
                        <div className="flex items-center gap-2 space-x-2 border border-accent py-1 px-3 rounded-2xl">
                            <Label htmlFor="cot" className="text-white font-semibold">CoT</Label>
                            <Switch id="cot" />
                        </div>
                    </div>
                </div>
            </>
        : null}

        {Download ? 
            <></>
        : null}

        {Console ? 
            <></>
        : null}

        {Logs ? 
            <></>
        : null}

        </div>
    )
}