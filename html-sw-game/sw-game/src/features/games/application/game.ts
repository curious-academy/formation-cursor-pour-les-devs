import { GetAllEnemies } from "../../enemies/services/get-enemies";
import { enemiesDisplayer } from "../../enemies/displayers/enemies-displayer";
import type { PrepareEnemies } from "../../enemies/application/prepare-enemies";
import type { GameState } from './game-state';
import type { Enemy } from '../../enemies/models/enemy';

export class Game {
    private prepareEnemies: PrepareEnemies;
    private getEnemies: GetAllEnemies;
    private displayEnemies: typeof enemiesDisplayer;
    private state: GameState | null = null;
    private static STORAGE_KEY = 'sw-game-state';

    constructor(prepareEnemies: PrepareEnemies, getEnemies: GetAllEnemies, displayEnemies: typeof enemiesDisplayer) {
        this.prepareEnemies = prepareEnemies;
        this.getEnemies = getEnemies;
        this.displayEnemies = displayEnemies;
    }

    /**
     * Quoi : Initialise une nouvelle partie ou reprend une partie sauvegardée.
     * Comment : Charge l'état depuis le stockage ou prépare une nouvelle partie.
     * Pourquoi : Permet de commencer ou reprendre une partie.
     */
    async initialize(): Promise<void> {
        const loaded = this.load();
        if (loaded) {
            this.state = loaded;
            await this.displayEnemies(this.state.enemies);
        } else {
            await this.prepareEnemies(this.getEnemies, async (enemies: Enemy[]) => {
                this.state = { enemies, score: 0 };
                await this.displayEnemies(enemies);
                this.save();
            });
        }
    }

    /**
     * Quoi : Sauvegarde l'état courant de la partie dans le localStorage.
     * Comment : Sérialise l'objet GameState.
     * Pourquoi : Permet la persistance de la partie.
     */
    public save(): void {
        if (this.state) {
            saveToStorage(Game.STORAGE_KEY, this.state);
        }
    }

    /**
     * Quoi : Charge l'état de la partie depuis le localStorage.
     * Comment : Désérialise l'objet GameState.
     * Pourquoi : Permet de reprendre une partie sauvegardée.
     */
    public load(): GameState | null {
        try {
            return loadFromStorage<GameState>(Game.STORAGE_KEY);
        } catch (e: unknown) {
            return null;
        }
    }

    /**
     * Quoi : Quitte la partie en cours.
     * Comment : Réinitialise l'état et sauvegarde.
     * Pourquoi : Permet d'arrêter proprement la partie.
     */
    public quit(): void {
        this.save();
        this.state = null;
    }

    /**
     * Quoi : Reprend la partie sauvegardée.
     * Comment : Recharge l'état et réaffiche les ennemis.
     * Pourquoi : Permet de continuer une partie interrompue.
     */
    public async resume(): Promise<void> {
        const loaded = this.load();
        if (loaded) {
            this.state = loaded;
            await this.displayEnemies(this.state.enemies);
        }
    }
}

function saveToStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadFromStorage<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) as T : null;
}