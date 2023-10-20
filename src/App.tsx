// import { useEffect } from "react";
// import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// import GridEngine from 'grid-engine';
// import BootScene from './game/scenes/BootScene';

// import GameOverScene from './game/scenes/GameOverScene';
// import GameScene from './game/scenes/GameScene';


// import dialogBorderBox from './game/assets/images/dialog_borderbox.png';
// import GameMenu from "./game/GameMenu";
// import DialogBox from "./game/DialogBox";
// import HeroCoin from "./game/HeroCoin";
// import HeroHealth from "./game/HeroHealth";

// import { calculateGameSize } from "./game/utils";

// const { width, height, multiplier } = calculateGameSize();
// class BombermanMap extends Phaser.Scene {
//   constructor() {
//     super({ key: 'BombermanMap' });
//   }

//   preload() {
//     this.load.image('tile', 'tile.png'); // Assurez-vous de fournir une image appropriée pour les tuiles.
//   }

//   create() {
//     const tileWidth = 32; // Largeur d'une tuile (en pixels)
//     const numRows = 16; // Nombre de lignes
//     const numCols = 16; // Nombre de colonnes

//     for (let row = 0; row < numRows; row++) {
//       for (let col = 0; col < numCols; col++) {
//         const x = col * tileWidth;
//         const y = row * tileWidth;
//         this.add.image(x, y, 'tile');
//       }
//     }
//   }
// }

// const BombermanGame = () => {
//   useEffect(() => {
//     const config = {
//       type: Phaser.AUTO,
//       width: 512,
//       height: 512,
//       scene: BombermanMap
//     };

//     const game = new Phaser.Game(config);

//     return () => {
//       game.destroy(true);
//     }
//   }, []);

//   return (
//     <div id="phaser-game" />
//   );
// }

// export default BombermanGame;

  // // const useStyles = makeStyles((theme) => ({
  // //   modal: {
  // //     display: 'flex',
  // //     alignItems: 'center',
  // //     justifyContent: 'center',
  // //   },
  // //   paper: {
  // //     backgroundColor: theme.palette.background.paper,
  // //     border: '2px solid #000',
  // //     boxShadow: theme.shadows[5],
  // //     padding: theme.spacing(2, 4, 3),
  // //     overflow: 'auto',
  // //   },
  // //   postContainer: {
  // //     maxWidth: '90%',
  // //     maxHeight: '90%',
  // //   },
  // //   gameContentWrapper: {
  // //     width: `${width * multiplier}px`,
  // //     height: `${height * multiplier}px`,
  // //     margin: 'auto',
  // //     padding: 0,
  // //     overflow: 'hidden',
  // //     '& canvas': {
  // //       imageRendering: 'pixelated',
  // //       '-ms-interpolation-mode': 'nearest-neighbor',
  // //       boxShadow: '0px 0px 0px 3px rgba(0,0,0,0.75)',
  // //     },
  // //   },
  // //   pageWrapper: {
  // //     background: theme.palette.background.paper,
  // //     padding: 0,
  // //     margin: 0,
  // //   },
  // //   loadingText: {
  // //     fontFamily: '"Press Start 2P"',
  // //     marginTop: '30px',
  // //     marginLeft: '30px',
  // //   },
  // //   preLoadDialogImage: {
  // //     backgroundImage: `url("${dialogBorderBox}")`,
  // //     backgroundSize: '1px',
  // //     backgroundRepeat: 'no-repeat',
  // //   },
  // //   gameWrapper: {
  // //     color: '#FFFFFF',
  // //   },
  // //   gameGif: {
  // //     width: '100%',
  // //     position: 'absolute',
  // //     imageRendering: 'pixelated',
  // //     top: 0,
  // //   },
  // // }));
  
  // // const dialogs : any = {
  // //   "npc_01": [{
  // //     "message": "Hello",
  // //   }, {
  // //     "message": "How are you?",
  // //   }],
  // //   "npc_02": [{
  // //     "message": "Hello there",
  // //   }],
  // //   "npc_03": [{
  // //     "message": "Hi",
  // //   }, {
  // //     "message": "Ok bye!",
  // //   }],
  // //   "npc_04": [{
  // //     "message": "Hey",
  // //   }],
  // //   "sword": [{
  // //     "message": "You got a sword",
  // //   }],
  // //   "push": [{
  // //     "message": "You can push boxes now",
  // //   }],
  // //   "sign_01": [{
  // //     "message": "You can read this!",
  // //   }],
  // //   "book_01": [{
  // //     "message": "Welcome to the game!",
  // //   }]
  // // };
  

  // //  const classes = useStyles();
  //   const [messages, setMessages] = useState<any>([]);
  //   const [characterName, setCharacterName] = useState<any>('');
  //   const [gameMenuItems, setGameMenuItems] = useState<any>([]);
  //   const [gameMenuPosition, setGameMenuPosition] = useState<any>('center');
  //   const [heroHealthStates, setHeroHealthStates] = useState<any>([]);
  //   const [heroCoins, setHeroCoins] = useState<any>(null);
  
  //   const handleMessageIsDone = useCallback(() => {
  //     const customEvent = new CustomEvent(`${characterName}-dialog-finished`, {
  //       detail: {},
  //     });
  //     window.dispatchEvent(customEvent);
  
  //     setMessages([]);
  //     setCharacterName('');
  //   }, [characterName]);
  
  //   const handleMenuItemSelected = useCallback((selectedItem: any) => {
  //     setGameMenuItems([]);
  
  //     const customEvent = new CustomEvent('menu-item-selected', {
  //       detail: {
  //         selectedItem,
  //       },
  //     });
  //     window.dispatchEvent(customEvent);
  //   }, []);
  
  //   useEffect(() => {
  //    new Phaser.Game({
  //       type: Phaser.AUTO,
  //       title: 'some-game-title',
  //       parent: 'game-content',
  //       orientation: Phaser.Scale.LANDSCAPE,
  //       localStorageName: 'some-game-title',
  //       width,
  //       height,
  //       autoRound: true,
  //       pixelArt: true,
  //       scale: {
  //         autoCenter: Phaser.Scale.CENTER_BOTH,
  //         mode: Phaser.Scale.ENVELOP,
  //       },
  //       scene: [
  //         BootScene,
  //         MainMenuScene,
  //         GameScene,
  //         GameOverScene,
  //       ],
  //       physics: {
  //         default: 'arcade',
  //       },
  //       plugins: {
  //         scene: [
  //           {
  //             key: 'gridEngine',
  //             plugin: GridEngine,
  //             mapping: 'gridEngine',
  //           },
  //         ],
  //       },
  //       backgroundColor: '#000000',
  //     });
  
     
  //   }, []);
  
  //   useEffect(() => {
  //     const dialogBoxEventListener : any = ({ detail }) => {
  //       // TODO fallback
  //       setCharacterName(detail.characterName);
  //       // setMessages(
  //       //     dialogs[detail.characterName] 
  //       // );
  //     };
  //     window.addEventListener('new-dialog', dialogBoxEventListener);
  
  //     const gameMenuEventListener : any = ({ detail }) => {
  //       setGameMenuItems(detail.menuItems);
  //       setGameMenuPosition(detail.menuPosition);
  //     };
  //     window.addEventListener('menu-items', gameMenuEventListener);
  
  //     const heroHealthEventListener : any = ({ detail }) => {
  //       setHeroHealthStates(detail.healthStates);
  //     };
  //     window.addEventListener('hero-health', heroHealthEventListener);
  
  //     const heroCoinEventListener : any = ({ detail }) => {
  //       setHeroCoins(detail.heroCoins);
  //     };
  //     window.addEventListener('hero-coin', heroCoinEventListener);
  
  //     return () => {
  //       window.removeEventListener('new-dialog', dialogBoxEventListener);
  //       window.removeEventListener('menu-items', gameMenuEventListener);
  //       window.removeEventListener('hero-health', heroHealthEventListener);
  //       window.removeEventListener('hero-coin', heroCoinEventListener);
  //     };
  //   }, [ setCharacterName, setMessages]);
  
  //   return (
  //       <div>
  //         <div >
  //           <div
  //               id="game-content"
                
  //           >
  //             {/* this is where the game canvas will be rendered */}
  //           </div>
  //           {/* {heroHealthStates.length > 0 && (
  //               <HeroHealth
  //                   gameSize={{
  //                     width,
  //                     height,
  //                     multiplier,
  //                   }}
  //                   healthStates={heroHealthStates}
  //               />
  //           )}
  //           {heroCoins !== null && (
  //               <HeroCoin
  //                   gameSize={{
  //                     width,
  //                     height,
  //                     multiplier,
  //                   }}
  //                   heroCoins={heroCoins}
  //               />
  //           )}
  //           {messages.length > 0 && (
  //               <DialogBox
  //                   onDone={handleMessageIsDone}
  //                   characterName={characterName}
  //                   messages={messages}
  //                   gameSize={{
  //                     width,
  //                     height,
  //                     multiplier,
  //                   }}
  //               />
  //           )} */}
  //           {gameMenuItems.length > 0 && (
  //               <GameMenu
  //                   items={gameMenuItems}
  //                   gameSize={{
  //                     width,
  //                     height,
  //                     multiplier,
  //                   }}
  //                   position={gameMenuPosition}
  //                   onSelected={handleMenuItemSelected}
  //               />
  //           )}
  //         </div>
  //       </div>
  //   );
  // }