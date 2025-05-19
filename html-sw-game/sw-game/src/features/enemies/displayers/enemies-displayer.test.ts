import { enemiesDisplayer } from './enemies-displayer';
import type { Enemy } from '../models/enemy';

describe('enemiesDisplayer', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="game-container"></div>';
  });

  it('affiche les ennemis dans le DOM', async () => {
    const enemies: Enemy[] = [
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
    await enemiesDisplayer(enemies);
    const container = document.getElementById('enemies-container');
    expect(container).not.toBeNull();
    expect(container?.children.length).toBe(enemies.length);
  });
}); 