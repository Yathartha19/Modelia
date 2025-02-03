const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    minWidth: 900,
    minHeight: 500,
    frame: true,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000"); // Next.js dev server

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

ipcMain.on("close-app", () => {
  console.log("✅ Received close-app event, quitting...");
  app.quit();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
