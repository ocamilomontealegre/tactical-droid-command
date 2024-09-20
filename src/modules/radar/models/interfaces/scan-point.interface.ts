import type { ICoordinates } from "./coordinates.interface";
import type { IEnemy } from "./enemy.interface";

export interface IScanPoint {
  readonly coordinates: ICoordinates;
  readonly enemies: IEnemy;
  readonly allies: number;
}
