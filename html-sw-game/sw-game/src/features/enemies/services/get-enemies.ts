import type { Enemy } from "../models/enemy";

export class GetAllEnemies {
    async getAll(): Promise<Enemy[]> {
        return await new Promise<Enemy[]>(resolve => {
            setTimeout(() => {
                const array: Enemy[] = [
                   {
                    id: 1,
                    firstName: "Darth",
                    lifePoint: { current: 100, max: 100 },
                    speed: 1,
                    position: { x: 0, y: 0 },
                    direction: { x: 1, y: 0 },
                    isMoving: false
                   },
                   {
                    id: 2,
                    firstName: "Darth",
                    lifePoint: { current: 100, max: 100 },
                    speed: 1,
                    position: { x: 0, y: 0 },
                    direction: { x: 1, y: 0 },
                    isMoving: false
                   },
                   {
                    id: 3,
                    firstName: "Darth",
                    lifePoint: { current: 100, max: 100 },
                    speed: 1,
                    position: { x: 0, y: 0 },
                    direction: { x: 1, y: 0 },
                    isMoving: false
                   }
                ]

                resolve(array);
            }, 1500)
        });
    }
}