import styles from "./app.module.scss";
import { Tile } from "./components/Tile/Tile";
import { useIpdata } from "./hooks/useipdata";

export function App() {
  const ipData = useIpdata();

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
