import * as Phaser from "phaser";
import characters from "../assets/characters/characters.png";
import { Player } from "./utils/Player";
import { GridControls } from "./utils/GridControls";
import { GridPhysics } from "./utils/GridPhysics";
import mainMapaJson from '../../game/assets/sprites/maps/tilesets/map.json';
import tilesetImage from '../../game/assets/sprites/maps/tilesets/tileset.png';
import objeto from '../../game/assets/images/heart_container.png';
import { Direction } from "./utils/Direction";
import Bomb from "./utils/Bomb";

export default class MainGameScene extends Phaser.Scene {
    static readonly TILE_SIZE = 16;
    private gridControls: GridControls | undefined;
    private gridPhysics: GridPhysics | undefined;
    private bullets: Phaser.GameObjects.Group | undefined;
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
        this.load.tilemapTiledJSON("mapKey", mainMapaJson);
        this.load.image("tileset", tilesetImage);
        this.load.image("bullet", objeto);
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

        // Define Bullet class
        class Bullet extends Phaser.GameObjects.Image {
            speed;

            constructor(scene) {
                super(scene, 0, 0, 'bullet');
                this.speed = Phaser.Math.GetSpeed(600, 1);
            }

            fire(x, y) {
                this.setPosition(x, y);
                this.setActive(true);
                this.setVisible(true);
            }

            update(time: number, delta: number) {
                this.x += this.speed * delta;
                if (this.x > 820) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
        }

        // Create a group of bullets
        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 30,
            runChildUpdate: true
        });

        // Define spacebar input
        this.spacebar = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    // Update game state
    update(_time: number, delta: number) {
        this.gridControls.update();
        this.gridPhysics.update(delta);

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            const bullet = this.bullets.get();

            if (bullet) {
                bullet.fire(this.player.x, this.player.y);
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