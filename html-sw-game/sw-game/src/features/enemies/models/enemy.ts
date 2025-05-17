/**
 * Quoi : Structure représentant les points de vie d'un ennemi.
 * Comment : Contient la valeur actuelle et la valeur maximale.
 * Pourquoi : Permet de gérer la santé et la survie des ennemis dans le jeu.
 */
interface LifePoint {
    current: number;
    max: number;
}

/**
 * Quoi : Structure représentant une position ou un vecteur 2D.
 * Comment : Définit les coordonnées x et y dans l'espace du jeu.
 * Pourquoi : Utilisé pour localiser ou déplacer les entités sur la carte.
 */
interface Position {
    x: number;
    y: number;
}

/**
 * Quoi : Interface décrivant un ennemi du jeu.
 * Comment : Regroupe toutes les propriétés nécessaires à la gestion d'un ennemi (identité, état, déplacement, saut...).
 * Pourquoi : Centralise la définition d'un ennemi pour garantir la cohérence et la maintenabilité du code.
 */
export interface Enemy {
    id: number;
    firstName: string;
    lifePoint: LifePoint;
    speed: number; // vitesse de déplacement en secondes ou pixels/seconde selon le contexte
    position: Position; // position actuelle de l'ennemi
    direction: Position; // direction du déplacement (vecteur normalisé)
    isMoving: boolean; // indique si l'ennemi est en mouvement

    // Ajout pour l'accélération
    acceleration?: number; // accélération en unités/s²
    maxSpeed?: number;     // vitesse maximale atteignable

    // Ajout pour le saut
    isJumping?: boolean; // indique si l'ennemi est en train de sauter
    verticalSpeed?: number; // vitesse verticale (pour la gravité et le saut)
    jumpPower?: number; // puissance du saut (hauteur)
}
