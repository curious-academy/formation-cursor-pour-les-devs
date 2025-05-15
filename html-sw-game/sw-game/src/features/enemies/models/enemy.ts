interface LifePoint {
    current: number;
    max: number;
}

interface Position {
    x: number;
    y: number;
}

export interface Enemy {
    id: number;
    firstName: string;
    lifePoint: LifePoint;
    speed: number; // vitesse de déplacement en secondes ou pixels/seconde selon le contexte
    position: Position; // position actuelle de l'ennemi
    direction: Position; // direction du déplacement (vecteur normalisé)
    isMoving: boolean; // indique si l'ennemi est en mouvement
}
