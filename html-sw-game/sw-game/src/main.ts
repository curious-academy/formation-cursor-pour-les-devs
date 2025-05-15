import { prepareEnemies } from './features/enemies/application/prepare-enemies';
import { enemiesDisplayer } from './features/enemies/displayers/enemies-displayer';
import { GetAllEnemies } from './features/enemies/services/get-enemies';
import { Game } from './features/games/application/game';
import './style.css'  

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Star Wars Game</h1> 
    <div id="game-container">
      <div id="character-container">
        
      </div>
    </div>
  </div>
`

const game = new Game(prepareEnemies, new GetAllEnemies(), enemiesDisplayer);
game.initialize();
