import * as Phaser from 'phaser';

class Bomb extends Phaser.GameObjects.Sprite {
  private scene: Phaser.Scene;
  private power: number;
  private timer: Phaser.Time.TimerEvent;
  isExploded: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bombKey'); // 'bombKey' is the key for your bomb image

    this.scene = scene;
    this.power = 1; // Power of the bomb (can be adjusted as needed)
    this.timer = null; // Timer to control bomb explosion delay
    this.isExploded = false; // Flag to track bomb state

    this.scene.add.existing(this);
  }

  // Function to start the bomb timer
  public startTimer(): void {
    if (!this.isExploded) {
      this.timer = this.scene.time.delayedCall(3000, this.explode, [], this);
    }
  }

  // Function to handle bomb explosion
  private explode(): void {
    if (!this.isExploded) {
      this.isExploded = true;

      // Implement the explosion logic here
      // For example, create explosion sprites and handle collisions

      // Remove the bomb from the scene
      this.destroy();
    }
  }
}

export default Bomb;
