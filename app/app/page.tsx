"use client"
import { AppLayout } from "@/app/figma/components/AppLayout";
import { Toaster } from "@/app/figma/components/ui/sonner";
import { UserProvider } from "@/context/UserContext"; //Importación del UserProvider

export default function AppPage(){
    return(
        //Incorporamos el UserProvider para envolver la aplicación y proporcionar el contexto de usuarioS
        <UserProvider>
            
            <>
                <AppLayout onNavigate={()=>{}} />
                <Toaster />
            </>

        </UserProvider>
    )
}