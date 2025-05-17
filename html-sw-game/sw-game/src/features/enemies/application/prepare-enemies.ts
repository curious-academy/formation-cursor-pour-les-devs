import { GetAllEnemies } from "../services/get-enemies";
import { enemiesDisplayer } from "../displayers/enemies-displayer";

/**
 * Quoi : Prépare l'affichage des ennemis dans le jeu.
 * Comment : Récupère la liste des ennemis via le service fourni, puis déclenche l'affichage avec le displayer.
 * Pourquoi : Permet d'orchestrer la récupération et l'affichage des ennemis de façon asynchrone et découplée.
 */
export const prepareEnemies = async (getEnemies: GetAllEnemies, display: typeof enemiesDisplayer) => {
    const enemies = await getEnemies.getAll();
    await display(enemies);
}

/**
 * Quoi : Type utilitaire pour la fonction prepareEnemies.
 * Comment : Utilise typeof pour extraire le type de la fonction.
 * Pourquoi : Facilite l'injection ou la typage fort dans d'autres parties du code.
 */
export type PrepareEnemies = typeof prepareEnemies; 