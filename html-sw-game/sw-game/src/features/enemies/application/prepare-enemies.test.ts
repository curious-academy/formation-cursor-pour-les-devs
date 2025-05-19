import { prepareEnemies } from './prepare-enemies';
import type { Enemy } from '../models/enemy';

// Mocks
class GetAllEnemiesMock {
  getAll = jest.fn<Promise<Enemy[]>, []>();
}

describe('prepareEnemies', () => {
  it('doit récupérer les ennemis et appeler le displayer', async () => {
    const mockEnemies: Enemy[] = [
      {
        id: 1,
        firstName: 'Darth',
        lifePoint: { current: 100, max: 100 },
        speed: 1,
        position: { x: 0, y: 0 },
        direction: { x: 1, y: 0 },
        isMoving: false
      }
    ];
    const getEnemies = new GetAllEnemiesMock();
    getEnemies.getAll.mockResolvedValue(mockEnemies);
    const display = jest.fn();

    await prepareEnemies(getEnemies as any, display);

    expect(getEnemies.getAll).toHaveBeenCalled();
    expect(display).toHaveBeenCalledWith(mockEnemies);
  });
}); 