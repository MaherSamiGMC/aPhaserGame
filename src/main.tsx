import * as Phaser from 'phaser';
import mur from './assets/mur.png';
import sol from './assets/sol.png';
import "./index.css";



function creerCarte(largeur: number, longueur: number): number[][] {
    const carte: number[][] = [];

    for (let i = 0; i < longueur; i++) {
        const ligne: number[] = [];
        for (let j = 0; j < largeur; j++) {
            if (i === 0 || i === longueur - 1 || j === 0 || j === largeur - 1) {
                ligne.push(1); // Ajoute un mur aux bords de la carte
            } else {
                ligne.push(0); // Ajoute un espace vide à l'intérieur
            }
        }
        carte.push(ligne);
    }

    return carte;
}
class BombermanGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image('mur', mur);
        this.load.image('espaceVide', sol);
        this.load.image('joueur', 'chemin/vers/image/joueur.png');
        // Ajoutez d'autres images si nécessaire pour les autres éléments du jeu
    }

    create() {
        const tailleTuile = 32; // Taille d'une tuile en pixels
        const carte = creerCarte(24, 24)


        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 24; j++) {
                const tileType = carte[i][j];
                const x = j * tailleTuile;
                const y = i * tailleTuile;
                if (tileType === 1) {
                    this.add.image(x, y, 'mur').setOrigin(0, 0);
                } else if (tileType === 2) {
                    this.add.image(x, y, 'joueur').setOrigin(0, 0);
                } else {
                    this.add.image(x, y, 'espaceVide').setOrigin(0, 0);
                }
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 768, // 24 tuiles x 32 pixels
    height: 768, // 24 tuiles x 32 pixels
    scene: BombermanGame
};

const game = new Phaser.Game(config);
