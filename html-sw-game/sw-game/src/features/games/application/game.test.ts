import { Game } from './game';
import { enemiesDisplayer } from '../../enemies/displayers/enemies-displayer';
import { GetAllEnemies } from '../../enemies/services/get-enemies';
import type { PrepareEnemies } from '../../enemies/application/prepare-enemies';
import type { Enemy } from '../../enemies/models/enemy';

describe('Game', () => {
  let game: Game;
  let getEnemies: GetAllEnemies;
  let display: typeof enemiesDisplayer;
  let prepare: PrepareEnemies;
  let mockEnemies: Enemy[];

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: (function() {
        let store: Record<string, string> = {};
        return {
          getItem: (key: string) => store[key] || null,
          setItem: (key: string, value: string) => { store[key] = value; },
          clear: () => { store = {}; },
          removeItem: (key: string) => { delete store[key]; }
        };
      })(),
      writable: true
    });
    mockEnemies = [
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
    getEnemies = { getAll: jest.fn().mockResolvedValue(mockEnemies) } as any;
    display = jest.fn();
    prepare = async (g, d) => { await d(mockEnemies); };
    localStorage.clear();
    game = new Game(prepare, getEnemies, display);
  });

  it('initialise une nouvelle partie', async () => {
    await game.initialize();
    expect(display).toHaveBeenCalledWith(mockEnemies);
  });

  it('sauvegarde et charge une partie', () => {
    (game as any).state = { enemies: mockEnemies, score: 42 };
    game.save();
    const loaded = game.load();
    expect(loaded?.score).toBe(42);
  });

  it('quitte et reprend une partie', async () => {
    (game as any).state = { enemies: mockEnemies, score: 10 };
    game.save();
    game.quit();
    expect((game as any).state).toBeNull();
    await game.resume();
    expect(display).toHaveBeenCalledWith(mockEnemies);
  });
}); 