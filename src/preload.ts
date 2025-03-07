// See the Electron documentation for details on how to use preload scripts:

import { contextBridge, ipcRenderer } from "electron";

// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
contextBridge.exposeInMainWorld("electronAPI", {
  getgrovalIP: () => ipcRenderer.invoke("get-myglobalip"),
  updateEventSend: (callback: () => void) =>
    ipcRenderer.on("send-update", () => callback()),
  getConfig: () => ipcRenderer.invoke("get-config"),
  setConfig: (config: { ipCheckUrl: string }) => ipcRenderer.invoke("set-config", config),
});
