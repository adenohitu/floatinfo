import { useEffect, useState } from "react";
import { ipStatusApiResponse } from "../types/ipcheck";
import styles from "./app.module.scss";
import { Tile } from "./components/Tile/Tile";

export function App() {
  const [ipData, setIpData] = useState<ipStatusApiResponse | null>(null);

  useEffect(() => {
    (async () => {
      const iprawData = await window.electronAPI.getgrovalIP();
      setIpData(iprawData);
    })();
  }, []);

  useEffect(() => {
    console.log("makeEffect" + Date.now());

    window.electronAPI.updateEventSend(() => {
      console.log("updateEventSend" + Date.now());

      (async () => {
        const iprawData = await window.electronAPI.getgrovalIP();
        setIpData(iprawData);
      })();
    });
  }, []);

  useEffect(() => {
    const updateOnlineStatus = () => {
      if (navigator.onLine) {
        console.log("online");
        (async () => {
          const iprawData = await window.electronAPI.getgrovalIP();
          setIpData(iprawData);
        })();
      } else {
        console.log("offline");
        setIpData({
          ClientIP: "offline",
          Name: "",
          Organization: "",
          status: "offline",
        });
      }
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const iprawData = await window.electronAPI.getgrovalIP();
      setIpData(iprawData);
    }, 30000); // 30秒ごとに更新

    return () => clearInterval(intervalId); // クリーンアップ
  }, []);

  return (
    <div className={styles.windowParent}>
      {ipData ? (
        <>
          {ipData.ClientIP && (
            <Tile text={ipData.ClientIP} oneLineLimit />
          )}
          {ipData.Name && (
            <Tile text={ipData.Name} oneLineLimit />
          )}
          {ipData.Organization && (
            <Tile text={ipData.Organization} twoLineLimit />
          )}
        </>
      ) : (
        <Tile text="Loading..." />
      )}
    </div>
  );
}
