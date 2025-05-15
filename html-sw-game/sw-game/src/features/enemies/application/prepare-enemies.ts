import { GetAllEnemies } from "../services/get-enemies";
import { enemiesDisplayer } from "../displayers/enemies-displayer";

export const prepareEnemies = async (getEnemies: GetAllEnemies, display: typeof enemiesDisplayer) => {
    const enemies = await getEnemies.getAll();
    await display(enemies);
}

export type PrepareEnemies = typeof prepareEnemies; 