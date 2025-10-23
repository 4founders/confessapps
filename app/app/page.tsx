"use client"
import { AppLayout } from "@/app/figma/components/AppLayout";
import { Toaster } from "@/app/figma/components/ui/sonner";

export default function AppPage(){
    return(
        <>
            <AppLayout onNavigate={()=>{}} />
            <Toaster />
        </>
    )
}