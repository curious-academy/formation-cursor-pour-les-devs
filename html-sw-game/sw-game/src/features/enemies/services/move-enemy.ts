import type { Enemy } from "../models/enemy";
import { GRAVITY } from '../../../config';

// Ce fichier contient la logique de déplacement des ennemis dans le jeu.
// La classe MoveEnemyService fournit une méthode pour mettre à jour la position d'un ennemi
// en fonction de sa direction, de sa vitesse et du temps écoulé (deltaTime).

export class MoveEnemyService {
    /**
     * Met à jour la position de l'ennemi selon sa direction, sa vitesse, le temps écoulé (deltaTime en secondes)
     * et gère le saut (verticalSpeed, gravité, isJumping)
     */
    move(enemy: Enemy, deltaTime: number): Enemy {
        if (!enemy.isMoving) return enemy;
        const { x: dx, y: dy } = enemy.direction;

        // --- AJOUT : gestion de l'accélération ---
        let newSpeed = enemy.speed;
        if (enemy.acceleration) {
            newSpeed += enemy.acceleration * deltaTime;
            if (enemy.maxSpeed !== undefined) {
                newSpeed = Math.min(newSpeed, enemy.maxSpeed);
            }
        }
        // -----------------------------------------

        const distance = newSpeed * deltaTime;

        // Gestion du saut et de la gravité
        let newY = enemy.position.y + dy * distance;
        let newVerticalSpeed = enemy.verticalSpeed ?? 0;
        let isJumping = enemy.isJumping ?? false;

        const gravity = GRAVITY; // pixels/s² ou unité adaptée à ton jeu

        if (isJumping) {
            // Appliquer la gravité
            newVerticalSpeed = newVerticalSpeed - gravity * deltaTime;
            newY = enemy.position.y - newVerticalSpeed * deltaTime;

            // Condition d'atterrissage (exemple : y >= sol)
            if (newY >= 0) {
                newY = 0;
                isJumping = false;
                newVerticalSpeed = 0;
            }
        }

        return {
            ...enemy,
            position: {
                x: enemy.position.x + dx * distance,
                y: newY
            },
            isJumping,
            verticalSpeed: newVerticalSpeed,
            // --- AJOUT : mettre à jour la vitesse ---
            speed: newSpeed
            // ----------------------------------------
        };
    }
} 