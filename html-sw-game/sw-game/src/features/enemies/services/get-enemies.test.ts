import { GetAllEnemies } from './get-enemies';

describe('GetAllEnemies', () => {
  it('doit retourner une liste d\'ennemis', async () => {
    const service = new GetAllEnemies();
    const enemies = await service.getAll();
    expect(Array.isArray(enemies)).toBe(true);
    expect(enemies.length).toBeGreaterThan(0);
    expect(enemies[0]).toHaveProperty('id');
    expect(enemies[0]).toHaveProperty('firstName');
    expect(enemies[0]).toHaveProperty('lifePoint');
  });
}); 