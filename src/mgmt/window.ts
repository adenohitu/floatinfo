import {
  BrowserWindow,
  BrowserWindowConstructorOptions,
  screen,
} from "electron";
import path from "path";
import os from "os"; // 追加

type windowKey = string;

export class windowMgmt {
  windowList: { [key: windowKey]: BrowserWindow } = {};

  public createMainWindow() {
    // すでにウィンドウが存在している場合は何もしない
    if (this.windowList["mainWindow"]) {
      return;
    }
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    const xPosition = os.platform() === "win32" ? width - 220 : width; // 変更
    const yPosition = os.platform() === "win32" ? height - 200 : height; // 変更

    const mainWindow = new BrowserWindow({
      height: 200,
      width: 220,
      transparent: true,
      frame: false,
      resizable: false,
      y: yPosition,
      x: xPosition,
      // opacity: 0.4,
      alwaysOnTop: true,
      // skipTaskbar: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.setSkipTaskbar(true);
    mainWindow.setVisibleOnAllWorkspaces(true, {
      visibleOnFullScreen: true,
      skipTransformProcessType: true,
    });

    // mainWindow.webContents.openDevTools({ mode: "detach" });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
      );
    }
    this.windowList["mainWindow"] = mainWindow;
    mainWindow.on("closed", () => {
      delete this.windowList["mainWindow"];
    });
  }

  public createSettingsWindow() {
    if (this.windowList["settingsWindow"]) {
      this.windowList["settingsWindow"].focus();
      return;
    }

    const settingsWindow = new BrowserWindow({
      height: 400,
      width: 600,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
      title: "Settings",
    });

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      settingsWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL + "#/settings");
    } else {
      settingsWindow.loadFile(
        path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
        { hash: "settings" }
      );
    }

    this.windowList["settingsWindow"] = settingsWindow;
    settingsWindow.on("closed", () => {
      delete this.windowList["settingsWindow"];
    });
  }

  public createWindow(
    key: windowKey,
    options: BrowserWindowConstructorOptions
  ) {
    if (this.windowList[key]) {
      return;
    }
    const window = new BrowserWindow(options);
    this.windowList[key] = window;
    window.on("closed", () => {
      delete this.windowList[key];
    });
  }
}
