"use client"

export function SiteHeader() {

  return (
    <header className="flex h-[2rem] fixed top-0 z-50 w-full items-center border-b bg-background" 
      style={
        {
          cursor: "move",
          WebkitAppRegion: "drag", 
        } as React.CSSProperties
      }
    >

    </header>
  )
}
