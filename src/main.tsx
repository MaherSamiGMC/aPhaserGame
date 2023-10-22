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
    // width: 800, // largeur en pixels
    // height: 800, // hauteur en pixels,
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
      mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH, // you can find another types in Phaser.Scale.ScaleModeType: RESIZE | FIT | ENVELOP ...
      autoCenter: Phaser.Scale.CENTER_BOTH,
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
