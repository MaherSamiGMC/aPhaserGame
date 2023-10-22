import * as Phaser from "phaser";
import characters from "../assets/characters/characters.png";
import { Player } from "./utils/Player";
import { GridControls } from "./utils/GridControls";
import { GridPhysics } from "./utils/GridPhysics";
import mainMapaJson from '../../game/assets/sprites/maps/tilesets/map.json';
import tilesetImage from '../../game/assets/sprites/maps/tilesets/tileset.png';
import objeto from '../../game/assets/images/heart_container.png';
import { Direction } from "./utils/Direction";

export default class MainGameScene extends Phaser.Scene {
  static readonly TILE_SIZE = 16;
  private gridControls: GridControls;
  private gridPhysics: GridPhysics;
  bullets;
  player;
  spacebar;
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
    this.load.image("bullet", objeto);
  }
  create() {
    // add map :
    const map = this.make.tilemap({ key: 'mapKey' });
    const tileset= map.addTilesetImage('tileset', 'tileset');
    map.createLayer('ground', tileset as Phaser.Tilemaps.Tileset,0,0 )
     map.createLayer('water', tileset as Phaser.Tilemaps.Tileset,0,0 )
     map.createLayer('object', tileset as Phaser.Tilemaps.Tileset,0,0 )
      // Ajoutez les layers à la scène
   // this.add.existing(groundLayer);
   // this.add.existing(waterLayer);

    // Configurez la caméra
//     this.cameras.main.scrollX = -map.widthInPixels / 2;
// this.cameras.main.scrollY = -map.heightInPixels / 2;
     this.cameras.main.setBounds(-100, 0, map.widthInPixels, map.heightInPixels);
  // this.cameras.main.centerToBounds();
    //add played :
    const firstPlayerSprite = this.add.sprite(0, 0, "firstPlayer");
    this.player = firstPlayerSprite;
    firstPlayerSprite.setDepth(2);
    firstPlayerSprite.scale = 1 ;
    this.cameras.main.startFollow(firstPlayerSprite);
    this.cameras.main.roundPixels = true;
    const Firstplayer = new Player(
      firstPlayerSprite,
      new Phaser.Math.Vector2(6, 6)
    );
    this.gridPhysics = new GridPhysics(Firstplayer,map);
    this.gridControls = new GridControls(this.input, this.gridPhysics);
    
    this.createPlayerAnimation(Direction.UP, 90, 92);
    this.createPlayerAnimation(Direction.RIGHT, 78, 80);
    this.createPlayerAnimation(Direction.DOWN, 54, 56);
    this.createPlayerAnimation(Direction.LEFT, 66, 68);
    class Bullet extends Phaser.GameObjects.Image
   
    { 
      speed;
     // player;
        constructor (scene)
        {
            super(scene, 0, 0, 'bullet');

            this.speed = Phaser.Math.GetSpeed(600, 1);
        }

        fire (x, y)
        {
            this.setPosition(x, y);

            this.setActive(true);
            this.setVisible(true);
        }

        update (time, delta)
        {
            this.x += this.speed * delta;

            if (this.x > 820)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }
    }

    this.bullets = this.add.group({
        classType: Bullet,
        maxSize: 30,
        runChildUpdate: true
    });

    

     // this.player = this.add.image(100, 300, objeto).setDepth(1000);

    this.spacebar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);



  }

  update(_time: number, delta: number) {
    this.gridControls.update();
    this.gridPhysics.update(delta);
    if (Phaser.Input.Keyboard.JustDown(this.spacebar))
    {
        const bullet = this.bullets.get();

        if (bullet)
        {
            bullet.fire(this.player.x, this.player.y);
        }
    }
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