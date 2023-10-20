import * as Phaser from "phaser";
import MainMenuScene from "./menu";
import { useEffect, useRef } from "react";

function Main() {
  const config = {
    type: Phaser.AUTO,
    parent: "phaserGame",
    width: 900,
    height: 700,
    backgroundColor: "#2e006c",
    scene: MainMenuScene,
  };
  const phaserGameRef = useRef<any>(null);

  useEffect(() => {
    if (phaserGameRef.current) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    return () => {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      };
  }, []);

  return <div id="phaserGame" key="phaserGame" />;
}

export default Main;

