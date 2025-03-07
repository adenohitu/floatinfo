import Store from "electron-store";

interface ConfigSchema {
  ipCheckUrl: string;
}

export class configMgmt {
  private store: Store<ConfigSchema>;

  constructor() {
    this.store = new Store<ConfigSchema>({
      defaults: {
        ipCheckUrl: "https://ownip-worker.flyanyfree.workers.dev",
      },
    });
  }

  getIpCheckUrl(): string {
    return this.store.get("ipCheckUrl");
  }

  setIpCheckUrl(url: string): void {
    this.store.set("ipCheckUrl", url);
  }
}
