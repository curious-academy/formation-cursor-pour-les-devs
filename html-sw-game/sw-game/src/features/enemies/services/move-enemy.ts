import type { Enemy } from "../models/enemy";

// Ce fichier contient la logique de déplacement des ennemis dans le jeu.
// La classe MoveEnemyService fournit une méthode pour mettre à jour la position d'un ennemi
// en fonction de sa direction, de sa vitesse et du temps écoulé (deltaTime).

export class MoveEnemyService {
    /**
     * Met à jour la position de l'ennemi selon sa direction, sa vitesse et le temps écoulé (deltaTime en secondes)
     */
    move(enemy: Enemy, deltaTime: number): Enemy {
        if (!enemy.isMoving) return enemy;
        const { x: dx, y: dy } = enemy.direction;
        const distance = enemy.speed * deltaTime;
        return {
            ...enemy,
            position: {
                x: enemy.position.x + dx * distance,
                y: enemy.position.y + dy * distance
            }
        };
    }
} 