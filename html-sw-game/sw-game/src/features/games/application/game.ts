import { GetAllEnemies } from "../../enemies/services/get-enemies";
import { enemiesDisplayer } from "../../enemies/displayers/enemies-displayer";
import type { PrepareEnemies } from "../../enemies/application/prepare-enemies";

export class Game {
    private prepareEnemies: PrepareEnemies;
    private getEnemies: GetAllEnemies;
    private displayEnemies: typeof enemiesDisplayer;

    constructor(prepareEnemies: PrepareEnemies, getEnemies: GetAllEnemies, displayEnemies: typeof enemiesDisplayer) {
        this.prepareEnemies = prepareEnemies;
        this.getEnemies = getEnemies;
        this.displayEnemies = displayEnemies;
    }

    initialize(): void {
        this.prepareEnemies(this.getEnemies, this.displayEnemies);
    }
}