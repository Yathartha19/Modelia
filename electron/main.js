const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { exec, execSync, spawn } = require("child_process");

let mainWindow;
let ollamaProcess;

const isMac = process.platform === "darwin";
const isWindows = process.platform === "win32";
const isLinux = process.platform === "linux";

function isOllamaRunning() {
  try {
    if (isMac || isLinux) {
      execSync("pgrep -x ollama");
    } else if (isWindows) {
      const tasklist = execSync("tasklist").toString();
      return tasklist.includes("ollama.exe");
    }
    return true;
  } catch {
    return false;
  }
}

function startOllama() {
  if (isOllamaRunning()) {
    console.log("✅ Ollama is already running.");
    return;
  }

  console.log("🚀 Starting Ollama...");

  if (isMac || isLinux) {
    ollamaProcess = spawn("ollama", ["serve"], { detached: true, stdio: "ignore" });
  } else if (isWindows) {
    ollamaProcess = spawn("cmd.exe", ["/c", "start", "ollama", "serve"], {
      detached: true,
      stdio: "ignore",
    });
  }

  if (ollamaProcess) ollamaProcess.unref();
}

function stopOllama() {
  console.log("🛑 Stopping Ollama...");
  if (isMac || isLinux) {
    exec("pkill -x ollama", (err) => {
      if (err) console.error("Error stopping Ollama:", err);
    });
  } else if (isWindows) {
    exec("taskkill /IM ollama.exe /F", (err) => {
      if (err) console.error("Error stopping Ollama:", err);
    });
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 750,
    minWidth: 900,
    minHeight: 500,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  mainWindow.on("maximize", () => {
    mainWindow.webContents.send("window-maximized");
  });

  mainWindow.on("unmaximize", () => {
    mainWindow.webContents.send("window-unmaximized");
  });
};

ipcMain.on('minimize-window', () => {
  mainWindow.minimize();
});

ipcMain.on('maximize-window', () => {
  mainWindow.maximize();
});

ipcMain.on('unmaximize-window', () => {
  mainWindow.unmaximize();
});

ipcMain.on('close-window', () => {
  mainWindow.close();
});

ipcMain.handle('is-window-maximized', () => {
  return mainWindow.isMaximized();
});

ipcMain.on("close-app", () => {
  console.log("✅ Received close-app event, quitting...");
  stopOllama();
  app.quit();
});

app.whenReady().then(() => {
  startOllama(); 
  createWindow();
});

app.on("window-all-closed", () => {
  stopOllama();
  if (!isMac) app.quit();
});

app.on("before-quit", stopOllama);
