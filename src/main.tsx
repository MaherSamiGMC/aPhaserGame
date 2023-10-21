import Phaser from "phaser";
import { useRef, useEffect } from "react";
import MainMenuScene from "./menu";
import GridEngine from "grid-engine";
import GameScene from "./game/scenes/GameScene";

function Main() {
  const config = {
    type: Phaser.AUTO,
    parent: "phaserGame",
    width: 800,
    height: 600,
   // backgroundColor: "#2e006c",
    physics: {
      default: "arcade",
    },
    plugins: {
      scene: [
        {
          key: "gridEngine",
          plugin: GridEngine,
          mapping: "gridEngine",
        },
      ],
    },
    scene: MainMenuScene,
    scale: {
      mode: Phaser.Scale.ScaleModes.RESIZE, // Activez le mode de redimensionnement
    },
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
