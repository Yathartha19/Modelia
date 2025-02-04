import { create } from "zustand";

const useSidebarStates = create((set) => ({
    chat: true,
    chatBox: true,
    parameters: false,
    download: false,
    console: false,
    logs: false,
    setChatBox: (value) => set({ chatBox: value }),
    setChat: (value) => set({ chat: value }),
    setParameters: (value) => set({ parameters: value }),
    setDownload: (value) => set({ download: value }),
    setConsole: (value) => set({ console: value }),
    setLogs: (value) => set({ logs: value }),
    model: '',
    setModel: (value) => set({ model: value }),
}));

export default useSidebarStates;
