import * as Phaser from "phaser";
import glassPanel from "../../game/assets/menu_assets/PNG/glassPanel.png";
import cursorHand from "../../game/assets/menu_assets/PNG/bomb.png";
import  "../../index.css";
import mainMapaJson from '../../game/assets/sprites/maps/tilesets/tileset.json';
import tilesetImage from '../../game/assets/sprites/maps/tilesets/dungeon_tiles.png';

export default class MainMenuScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private buttons: Phaser.GameObjects.Image[] = [];
  private selectedButtonIndex = 0;
  private buttonSelector!: Phaser.GameObjects.Image;

  constructor() {
    super("main-menu");
  }

  init() {
    this.cursors = this.input.keyboard?.createCursorKeys() as Phaser.Types.Input.Keyboard.CursorKeys;
  }

  preload() {
    this.load.image("glass-panel", glassPanel);
    this.load.image("cursor-hand", cursorHand);
    this.load.tilemapTiledJSON('mapKey', mainMapaJson);
    this.load.image('tileset', tilesetImage);
  }

  create() {
    const map = this.make.tilemap({ key: 'mapKey' });
    const tileset= map.addTilesetImage('dungeon', 'tileset');
     map.createLayer('Ground', tileset as Phaser.Tilemaps.Tileset )
    const { width, height } = this.scale;

    this.add.text(width * 0.5, height * 0.3, '<BOMBERMAN GAME ALIKE>', {
        fontSize: '48px',
        fontFamily: 'VT323'
      }).setOrigin(0.5)
    // Play button
    const playButton = this.add
      .image(width * 0.5, height * 0.6, "glass-panel")
      .setDisplaySize(200, 50);

    this.add.text(playButton.x, playButton.y, "Start the game",{
        fontSize: '26px',
        fontFamily: 'VT323'
      }).setOrigin(0.5);

    // Settings button
    const settingsButton = this.add
      .image(
        playButton.x,
        playButton.y + playButton.displayHeight + 10,
        "glass-panel"
      )
      .setDisplaySize(200, 50);

    this.add
      .text(settingsButton.x, settingsButton.y, "How to play ?",{
        fontSize: '26px',
        fontFamily: 'VT323'
      })
      .setOrigin(0.5);

    // Credits button
    const creditsButton = this.add
      .image(
        settingsButton.x,
        settingsButton.y + settingsButton.displayHeight + 10,
        "glass-panel"
      )
      .setDisplaySize(200, 50);

    this.add.text(creditsButton.x, creditsButton.y, "Credits",{
        fontSize: '26px',
        fontFamily: 'VT323'
      }).setOrigin(0.5);
    this.buttons.push(playButton);
    this.buttons.push(settingsButton);
    this.buttons.push(creditsButton);

    this.buttonSelector = this.add.image(0, 0, "cursor-hand").setDisplaySize(50, 50);
    this.selectButton(0);

    playButton.on("selected", () => {
      this.scene.start('main-game')
    });

    settingsButton.on("selected", () => {
        this.scene.launch('HowToPlayModalScene');
        this.scene.pause()
    });

    creditsButton.on("selected", () => {
        this.scene.launch('Credit');
        this.scene.pause()
    });
  }

  selectButton(index: number) {
    const currentButton = this.buttons[this.selectedButtonIndex];

    // set the current selected button to a white tint
    currentButton.setTint(0xffffff);

    const button = this.buttons[index];

    // set the newly selected button to a green tint
    button.setTint(0x66ff7f);

    // move the hand cursor to the right edge
    this.buttonSelector.x = button.x + button.displayWidth * 0.5;
    this.buttonSelector.y = button.y + 10;

    // store the new selected index
    this.selectedButtonIndex = index;
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change;

    // wrap the index to the front or end of array
    if (index >= this.buttons.length) {
      index = 0;
    } else if (index < 0) {
      index = this.buttons.length - 1;
    }

    this.selectButton(index);
  }

  confirmSelection() {
    // get the currently selected button
    const button = this.buttons[this.selectedButtonIndex];
    // emit the 'selected' event
    button.emit("selected");
  }

  update() {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!);
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
      this.cursors.space!
    );

    if (upJustPressed) {
      this.selectNextButton(-1);
    } else if (downJustPressed) {
      this.selectNextButton(1);
    } else if (spaceJustPressed) {
      this.confirmSelection();
    }
  }
}