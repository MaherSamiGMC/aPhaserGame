import * as Phaser from "phaser";

class CreditScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Credit' });
  }

  create() {
    this.cameras.main.setViewport(200, 100, 500, 500)
    const sceneWidth = this.cameras.main.width;
    const sceneHeight = this.cameras.main.height;
    // Add the modal background
    this.add.graphics()
      .fillStyle(0x000000, 0.8 )
      .fillRect(0, 0, 800, 600)
      .setInteractive();

    // Calculate the center position of the scene
    const centerX = sceneWidth / 2;
    const centerY = sceneHeight / 2;
    // Add the modal content
     this.add.text(centerX, centerY, 'Credits...', {
      fontSize: '24px',
      align: 'center',
      fontFamily: 'VT323'
    }).setOrigin(0.5);
    

    // exit HowToPlayModalScene modal : 
    this.add.text(sceneWidth-140, sceneHeight-20, 'press any button to exit', {
        fontSize: '24px',
        align: 'center',
        fontFamily: 'VT323'
      }).setOrigin(0.5);
    // Close the modal when clicking anywhere on the screen
    this.input.keyboard?.on('keydown', () => {
      this.scene.stop();
    });
  }
}

export default CreditScene;