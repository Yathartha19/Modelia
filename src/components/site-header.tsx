"use client";

import React, { useEffect, useState } from "react";
import { Minimize, Maximize, X, Square } from "lucide-react";

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: any[]) => void;
        on: (channel: string, func: (...args: any[]) => void) => void;
        invoke: (channel: string, ...args: any[]) => Promise<any>;
      };
      closeApp: () => void;
    };
  }
}

declare module "react" {
  interface CSSProperties {
    WebkitAppRegion?: string;
  }
}

export function SiteHeader() {
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.electron) {
      const { ipcRenderer } = window.electron;

      const checkMaximized = async () => {
        const maximized = await ipcRenderer.invoke("is-window-maximized");
        setIsMaximized(maximized);
      };

      ipcRenderer.on("window-maximized", () => {
        setIsMaximized(true);
      });

      ipcRenderer.on("window-unmaximized", () => {
        setIsMaximized(false);
      });

      document.getElementById("minimize")?.addEventListener("click", () => {
        ipcRenderer.send("minimize-window");
      });

      document.getElementById("maximize")?.addEventListener("click", () => {
        if (isMaximized) {
          ipcRenderer.send("unmaximize-window");
        } else {
          ipcRenderer.send("maximize-window");
        }
      });

      document.getElementById("close")?.addEventListener("click", () => {
        ipcRenderer.send("close-window");
      });

      checkMaximized();
    }
  }, []);

  return (
    <header
      className="flex h-[2rem] fixed top-0 z-50 w-full items-center border-b bg-background"
      style={{
        cursor: "move",
        WebkitAppRegion: "drag",
      } as React.CSSProperties}
    >
      <div className="flex items-center space-x-4 px-4">
        <img src="favicon.ico" alt="Logo" className="h-4 w-4" />
        <span className="text-sm font-medium text-gray-200">Modelia</span>
      </div>
      <div className="flex-grow"></div>
      <div
        className="flex items-center space-x-2 px-4"
        style={{ WebkitAppRegion: "no-drag" }}
      >
        <button
          id="minimize"
          type="button"
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-200"
        >
          <Minimize size={16} />
        </button>
        <button
          id="maximize"
          type="button"
          className="w-6 h-6 flex items-center justify-center hover:bg-gray-200"
        >
          {isMaximized ?  <Maximize size={16} /> : <Square size={16} />}
        </button>
        <button
          id="close"
          type="button"
          className="w-6 h-6 flex items-center justify-center hover:bg-red-500"
        >
          <X size={16} />
        </button>
      </div>
    </header>
  );
}
