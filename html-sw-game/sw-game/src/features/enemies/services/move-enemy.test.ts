import { MoveEnemyService } from './move-enemy';
import type { Enemy } from '../models/enemy';

describe('MoveEnemyService', () => {
  let service: MoveEnemyService;
  let baseEnemy: Enemy;

  beforeEach(() => {
    service = new MoveEnemyService();
    baseEnemy = {
      id: 1,
      firstName: 'Darth',
      lifePoint: { current: 100, max: 100 },
      speed: 10,
      position: { x: 0, y: 0 },
      direction: { x: 1, y: 0 },
      isMoving: true
    };
  });

  it('déplace un ennemi selon sa direction et sa vitesse', () => {
    const result = service.move(baseEnemy, 1);
    expect(result.position.x).toBeGreaterThan(baseEnemy.position.x);
  });

  it('ne déplace pas un ennemi immobile', () => {
    const still = { ...baseEnemy, isMoving: false };
    const result = service.move(still, 1);
    expect(result).toEqual(still);
  });

  it('applique l\'accélération et la vitesse max', () => {
    const fast = { ...baseEnemy, acceleration: 10, maxSpeed: 15 };
    const result = service.move(fast, 1);
    expect(result.speed).toBeLessThanOrEqual(fast.maxSpeed!);
  });

  it('gère le saut et la gravité', () => {
    const jumping = { ...baseEnemy, isJumping: true, verticalSpeed: 10 };
    const result = service.move(jumping, 1);
    expect(result.position.y).toBeLessThanOrEqual(jumping.position.y);
    expect(result.isJumping).toBe(true);
  });

  it('atterrit quand y >= 0', () => {
    const jumping = { ...baseEnemy, isJumping: true, verticalSpeed: 1, position: { x: 0, y: 0.1 } };
    const result = service.move(jumping, 1);
    expect(result.position.y).toBe(0);
    expect(result.isJumping).toBe(false);
  });
}); 