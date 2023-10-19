import { useEffect } from "react";

class BombermanMap extends Phaser.Scene {
  constructor() {
    super({ key: 'BombermanMap' });
  }

  preload() {
    this.load.image('tile', 'tile.png'); // Assurez-vous de fournir une image appropriée pour les tuiles.
  }

  create() {
    const tileWidth = 32; // Largeur d'une tuile (en pixels)
    const numRows = 16; // Nombre de lignes
    const numCols = 16; // Nombre de colonnes

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const x = col * tileWidth;
        const y = row * tileWidth;
        this.add.image(x, y, 'tile');
      }
    }
  }
}

const BombermanGame = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 512,
      height: 512,
      scene: BombermanMap
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    }
  }, []);

  return (
    <div id="phaser-game" />
  );
}

export default BombermanGame;
