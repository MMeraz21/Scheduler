import { app, BrowserWindow, shell } from "electron";
import { join } from "node:path";

const webUrl = process.env.SCHEDULER_WEB_URL ?? "http://localhost:3000";

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    title: "Scheduler",
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  window.loadURL(webUrl);

  window.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
