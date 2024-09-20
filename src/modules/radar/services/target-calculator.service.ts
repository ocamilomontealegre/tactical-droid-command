import { injectable } from "inversify";
import type { ICoordinates, IScanPoint } from "../models/interfaces";
import type { Protocol } from "../models/types/protocol.type";

@injectable()
export class TargetCalculatorService {
  private _calculateDistance(point: ICoordinates): number {
    return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
  }

  private _applyProtocols(scanPoints: IScanPoint[], protocols: Protocol[]): IScanPoint | null {
    let validPoints = scanPoints.filter(
      (point) => this._calculateDistance(point.coordinates) <= 100,
    );

    for (const protocol of protocols) {
      switch (protocol) {
        case "closest-enemies":
          validPoints.sort(
            (a, b) =>
              this._calculateDistance(a.coordinates) - this._calculateDistance(b.coordinates),
          );
          break;
        case "furthest-enemies":
          validPoints.sort(
            (a, b) =>
              this._calculateDistance(b.coordinates) - this._calculateDistance(a.coordinates),
          );
          break;
        case "assist-allies":
          validPoints = validPoints.filter((point) => point.allies && point.allies > 0);
          break;
        case "avoid-crossfire":
          validPoints = validPoints.filter((point) => !point.allies || point.allies === 0);
          break;
        case "prioritize-mech": {
          const mechPoints = validPoints.filter((point) => point.enemies.type === "mech");
          if (mechPoints.length > 0) {
            validPoints = mechPoints;
          }
          break;
        }
        case "avoid-mech":
          validPoints = validPoints.filter((point) => point.enemies.type !== "mech");
          break;
      }
    }
    return validPoints.length > 0 ? validPoints[0] : null;
  }

  public calculateTarget(protocols: Protocol[], scan: IScanPoint[]): ICoordinates | null {
    const target = this._applyProtocols(scan, protocols);
    if (target) {
      return { x: target.coordinates.x, y: target.coordinates.y };
    }
    return null;
  }
}
