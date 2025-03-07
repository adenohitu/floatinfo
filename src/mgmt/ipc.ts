import axios from "axios";
import { ipcMain } from "electron";
import { windowMgmt } from "./window";
import { configMgmt } from "./config";

export class ipcSetup {
  winddowMgmtApp: windowMgmt;
  configMgmt: configMgmt;

  constructor(winddowMgmtApp: windowMgmt) {
    this.winddowMgmtApp = winddowMgmtApp;
    this.configMgmt = new configMgmt();
  }

  async setup() {
    ipcMain.handle("get-myglobalip", this.handleGetData.bind(this));
    ipcMain.handle("get-config", () => ({
      ipCheckUrl: this.configMgmt.getIpCheckUrl()
    }));
    ipcMain.handle("set-config", (_, config: { ipCheckUrl: string }) => {
      this.configMgmt.setIpCheckUrl(config.ipCheckUrl);
    });
  }

  async handleGetData() {
    const url = this.configMgmt.getIpCheckUrl();
    const data = await axios.get(url);
    return data.data;
  }

  async updateEventSend() {
    this.winddowMgmtApp.windowList["mainWindow"]?.webContents.send(
      "send-update"
    );
  }
}
