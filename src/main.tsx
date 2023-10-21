import * as Phaser from "phaser";
import MainMenuScene from "./scenes/menu_scenes/menu";
import { useEffect, useRef } from "react";
import HowToPlayModalScene from "./scenes/menu_scenes/HowToPlayModalScene";
import CreditScene from "./scenes/menu_scenes/Credits";

function Main() {
  const config = {
    type: Phaser.AUTO,
    parent: "phaserGame",
    width: 900,
    height: 700,
    backgroundColor: "#2e006c",
    scene: [MainMenuScene,HowToPlayModalScene,CreditScene],
  };
  const phaserGameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (phaserGameRef.current) {
      return;
    }
    phaserGameRef.current = new Phaser.Game(config);
    return () => {
        phaserGameRef.current?.destroy(true);
        phaserGameRef.current = null;
      };
  }, []);

  return <div id="phaserGame" key="phaserGame" />;
}

export default Main;
