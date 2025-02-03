import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

import { LogOut } from "lucide-react"
import { exit } from "process"
  
  export function AlertDialogDemo() {

    const close = () => {
      if (typeof window !== "undefined" && window.electron) {
        console.log("✅ Calling Electron closeApp()");
        window.electron.closeApp();
      } else {
        console.error("❌ Electron API not available");
      }
    };        

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
            <LogOut className="absolute bottom-4 hover:bg-accent p-[0.35rem] rounded-lg hover:cursor-pointer" size={35}/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
            <AlertDialogDescription>
              This will close Modelia.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={close}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  