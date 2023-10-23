import * as Phaser from "phaser";
import characters from "../assets/characters/characters.png";
import { Player } from "./utils/Player";
import { GridControls } from "./utils/GridControls";
import { GridPhysics } from "./utils/GridPhysics";
import mainMapaJson from '../../game/assets/sprites/maps/tilesets/map.json';
import tilesetImage from '../../game/assets/sprites/maps/tilesets/tileset.png';
import bomb from '../../game/assets/objects/Icons_31.png';
import watchMeExploooode from '../../game/assets/objects/explosion-4.png';
import { Direction } from "./utils/Direction";

export default class MainGameScene extends Phaser.Scene {
    static readonly TILE_SIZE = 16;
    private gridControls: GridControls | undefined;
    private gridPhysics: GridPhysics | undefined;
    private bomb: Phaser.GameObjects.Group | undefined;
    private player: Phaser.GameObjects.Sprite | undefined;
    private spacebar: Phaser.Input.Keyboard.Key | undefined;

    constructor() {
        super("main-game");
    }

    // Initialisation (if needed)
    init() {
        // Initialize any necessary properties here
    }

    // Preload assets
    preload() {
        this.load.spritesheet("firstPlayer", characters, {
            frameWidth: 26,
            frameHeight: 36,
        });
        this.load.spritesheet("explode", watchMeExploooode, {
            frameWidth: 128,
            frameHeight: 128,
        });
        this.load.tilemapTiledJSON("mapKey", mainMapaJson);
        this.load.image("tileset", tilesetImage);
        this.load.image("bomb", bomb);
    }

    // Create game elements
    create() {
        const map = this.make.tilemap({ key: 'mapKey' });
        const tileset = map.addTilesetImage('tileset', 'tileset');
        
        // Create layers for the map
        map.createLayer('ground', tileset as Phaser.Tilemaps.Tileset, 0, 0);
        map.createLayer('water', tileset as Phaser.Tilemaps.Tileset, 0, 0);
        map.createLayer('object', tileset as Phaser.Tilemaps.Tileset, 0, 0);

        // Center camera on the map
        this.cameras.main.setBounds(-110, 0, map.widthInPixels, map.heightInPixels);

        // Add player sprite
        const firstPlayerSprite = this.add.sprite(0, 0, "firstPlayer");
        this.player = firstPlayerSprite;
        firstPlayerSprite.setDepth(2);
        firstPlayerSprite.scale = 1;
        this.cameras.main.startFollow(firstPlayerSprite);
        this.cameras.main.roundPixels = true;
        const Firstplayer = new Player(firstPlayerSprite, new Phaser.Math.Vector2(6, 6));

        // Initialize grid physics and controls
        this.gridPhysics = new GridPhysics(Firstplayer, map);
        this.gridControls = new GridControls(this.input, this.gridPhysics);

        // Create player animations
        this.createPlayerAnimation(Direction.UP, 90, 92);
        this.createPlayerAnimation(Direction.RIGHT, 78, 80);
        this.createPlayerAnimation(Direction.DOWN, 54, 56);
        this.createPlayerAnimation(Direction.LEFT, 66, 68);

        // Define bomb class
        class Bomb extends Phaser.GameObjects.Image {
            speed
            xPosition:number
            yPosition:number
            constructor(scene:any) {
                super(scene, 0, 0, 'bomb');
                this.speed = Phaser.Math.GetSpeed(0, 1);
            }

            fire(x:number, y:number) {
                this.xPosition=x
                this.yPosition=y
                this.setPosition(x, y);
                this.setActive(true);
                this.setVisible(true);
                setTimeout(() => {
                    this.setVisible(false);
                    this.scene.cameras.main.shake(200,0.02)
                    const explode=this.scene.add.sprite(this.xPosition,this.yPosition-50,'explode')
                    explode.anims.create({
                        key: "boom",
                        frameRate: 7,
                        frames: explode.anims.generateFrameNumbers("explode", { start: 3, end: 5 }),
                        repeat: -1
                    })
                    explode.play("boom");
                    setTimeout(() => {
                        explode.destroy();
                    }, 1000);

                }, 3000);
            }

            update(time: number, delta: number) {
                this.x += this.speed * delta;
                if (this.x > 820) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        }

        // Create  Bomb
        const theBomb=this.bomb = this.add.group({
            classType: Bomb,
            maxSize: -1,
            runChildUpdate: true,
            setScale:{x:0.2,y:0.2}
        })

        // Define spacebar input
        this.spacebar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    // Update game state
    update(_time: number, delta: number) {
        this.gridControls?.update();
        this.gridPhysics?.update(delta);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar as any)) {
            const bullet = this.bomb?.get();

            if (bullet) {
                bullet.fire(this.player?.x, this.player?.y);
            }
        }
    }

    // Create player animations
    private createPlayerAnimation(name: string, startFrame: number, endFrame: number) {
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