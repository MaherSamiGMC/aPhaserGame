import * as Phaser from "phaser";
import characters from "../assets/characters/characters.png";
import { Player } from "./utils/Player";
import { GridControls } from "./utils/GridControls";
import { GridPhysics } from "./utils/GridPhysics";
import mainMapaJson from "../../game/assets/sprites/maps/tilesets/tileset.json";
import tilesetImage from "../../game/assets/sprites/maps/tilesets/dungeon_tiles.png";
import { Direction } from "./utils/Direction";
import Bomb from "./utils/Bomb";

export default class MainGameScene extends Phaser.Scene {
  static readonly TILE_SIZE = 48;
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;
  constructor() {
    super("main-game");
  }

  init() {}

  preload() {
    this.load.spritesheet("firstPlayer", characters, {
      frameWidth: 26,
      frameHeight: 36,
    });
    this.load.tilemapTiledJSON("mapKey", mainMapaJson);
    this.load.image("tileset", tilesetImage);
  }
  create() {
    // add map :
    const map = this.make.tilemap({ key: 'mapKey' });
    const tileset= map.addTilesetImage('tileset', 'tileset');
    map.createLayer('ground', tileset as Phaser.Tilemaps.Tileset )
     map.createLayer('water', tileset as Phaser.Tilemaps.Tileset )
    //add played :
    const firstPlayerSprite = this.add.sprite(0, 0, "firstPlayer");
    firstPlayerSprite.setDepth(2);
    firstPlayerSprite.scale = 2;
    this.cameras.main.startFollow(firstPlayerSprite);
    this.cameras.main.roundPixels = true;
    const Firstplayer = new Player(
      firstPlayerSprite,
      new Phaser.Math.Vector2(6, 6)
    );
    this.gridPhysics = new GridPhysics(Firstplayer, map);
    this.gridControls = new GridControls(this.input, this.gridPhysics);

    this.createPlayerAnimation(Direction.UP, 90, 92);
    this.createPlayerAnimation(Direction.RIGHT, 78, 80);
    this.createPlayerAnimation(Direction.DOWN, 54, 56);
    this.createPlayerAnimation(Direction.LEFT, 66, 68);
  }

  update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
  }
  private createPlayerAnimation(
    name: string,
    startFrame: number,
    endFrame: number
  ) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers("firstPlayer", {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }
}