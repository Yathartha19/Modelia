console.log("✅ Preload script loaded!");

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  closeApp: () => ipcRenderer.send("close-app"),
});
