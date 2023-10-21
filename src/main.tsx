import Phaser from "phaser";
import { useRef, useEffect } from "react";
import MainMenuScene from "./game/scenes/menu";
import GridEngine from "grid-engine";
import HowToPlayModalScene from "./game/scenes/HowToPlayModalScene";
import CreditScene from "./game/scenes/Credits";
import MainGameScene from "./game/scenes/mainGameScene";

function Main() {
  const config = {
    type: Phaser.AUTO,
    parent: "phaserGame",
    
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
    scene: [MainMenuScene,HowToPlayModalScene,CreditScene,MainGameScene],
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT, // Activez le mode de redimensionnement
    },
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
