interface LifePoint {
    current: number;
    max: number;
}

export interface Enemy {
    id: number;
    firstName: string;
    lifePoint: LifePoint;
}
