import { ipStatusApiResponce } from "./types/ipcheck";

export interface IElectronAPI {
  getgrovalIP: () => Promise<any>;
  updateEventSend: (callback: () => void) => void;
  getConfig: () => Promise<{ ipCheckUrl: string }>;
  setConfig: (config: { ipCheckUrl: string }) => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
