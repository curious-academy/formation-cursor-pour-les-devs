/**
 * Quoi : Interface représentant l'état complet d'une partie.
 * Comment : Contient la liste des ennemis, le score, et d'autres paramètres à sauvegarder/restaurer.
 * Pourquoi : Permet la persistance et la reprise d'une partie à tout moment.
 */
import type { Enemy } from '../../enemies/models/enemy';

export interface GameState {
  enemies: Enemy[];
  score: number;
  // Ajouter ici d'autres propriétés à sauvegarder (joueur, niveau, temps, etc.)
} 