import type { Enemy } from "../models/enemy";
import { GAME_AREA_SIZE } from '../../../config';

/**
 * Quoi : Affiche dynamiquement une liste d'ennemis dans le DOM.
 * Comment : Génère un conteneur et une div pour chaque ennemi, positionnés aléatoirement dans une zone de 400x400px, puis ajoute le tout dans #game-container.
 * Pourquoi : Permet de visualiser les ennemis du jeu de façon interactive et dynamique, en tenant compte de leur état et de leur vitesse.
 */
export const enemiesDisplayer = async (enemies: Enemy[]) => {

    // On va générer une liste de divs pour chaque ennemi avec une position aléatoire
    const container = document.createElement('div');
    container.id = "enemies-container";
    container.style.position = "relative";

    function getRandomPosition(maxX: number, maxY: number): { x: number, y: number } {
        return { x: Math.floor(Math.random() * maxX), y: Math.floor(Math.random() * maxY) };
    }

    enemies.forEach(enemy => {
        const enemyDiv = document.createElement('div');
        enemyDiv.className = "enemy";
        enemyDiv.innerText = `${enemy.firstName} (${enemy.lifePoint.current}/${enemy.lifePoint.max})`;
        enemyDiv.style.position = "absolute";
        // Générer des positions aléatoires dans une zone de 400x400px
        const { x, y } = getRandomPosition(GAME_AREA_SIZE, GAME_AREA_SIZE);
        enemyDiv.style.left = `${x}px`;
        enemyDiv.style.top = `${y}px`;
        enemyDiv.style.padding = "8px";
        enemyDiv.style.background = "#222";
        enemyDiv.style.color = "#fff";
        enemyDiv.style.borderRadius = "8px";
        enemyDiv.style.border = "1px solid #fff";
        container.appendChild(enemyDiv);
        enemyDiv.style.transition = `left ${enemy.speed}s linear, top ${enemy.speed}s linear`;
    });

    // Ajouter le container au DOM (par exemple dans #game-container)
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        // On retire l'ancien container s'il existe
        const old = document.getElementById('enemies-container');
        if (old) old.remove();
        gameContainer.appendChild(container);
    }
}