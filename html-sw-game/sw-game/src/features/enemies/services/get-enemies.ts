import type { Enemy } from "../models/enemy";

export class GetAllEnemies {
    async getAll(): Promise<Enemy[]> {
        return await new Promise<Enemy[]>(resolve => {
            setTimeout(() => {
                const array: Enemy[] = [
                   { 
                    id: 1,
                    firstName: "Darth",
                    lifePoint: { current: 100, max: 100 }
                   },
                   { 
                    id: 2,
                    firstName: "Darth",
                    lifePoint: { current: 100, max: 100 }
                   },   
                   { 
                    id: 3,
                    firstName: "Darth",
                    lifePoint: { current: 100, max: 100 }
                   }
                ]

                resolve(array);
            }, 1500)
        });
    }
}