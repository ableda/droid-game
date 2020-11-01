import { DroidEnemies } from '../types/droidEnemies';
import { DroidProtocols } from '../types/droidProtocols';
import { RadarPostBody, RadarScan } from '../types/radarPostBody';
import { RadarCoordinates } from '../types/radarCoordinates';
import { distanceToCoordinates } from '../utils/distanceToCoordinates';

export default class TargetService {
  private protocols: DroidProtocols[];

  private radarScans: RadarScan[];

  private protocolScanFilterConditions = {
    [DroidProtocols.AssitAllies]: (radarScan: RadarScan): boolean => radarScan.allies !== undefined,
    [DroidProtocols.AvoidCrossfire]: (radarScan: RadarScan): boolean => radarScan.allies === undefined,
    [DroidProtocols.PriotizeMech]: (radarScan: RadarScan): boolean =>
      radarScan.enemies.type === DroidEnemies.Mech,
    [DroidProtocols.AvoidMech]: (radarScan: RadarScan): boolean =>
      radarScan.enemies.type !== DroidEnemies.Mech,
  };

  constructor(radarBody: RadarPostBody) {
    this.protocols = radarBody.protocols;
    this.radarScans = radarBody.scan;
  }

  public getNextTargetToDestroy(): RadarCoordinates {
    let finalCommand: DroidProtocols = DroidProtocols.ClosestEnemies; // Default to closest enemy
    let finalRadarScans: RadarScan[] = this.radarScans;

    this.protocols.forEach((protocol: DroidProtocols) => {
      if (protocol === DroidProtocols.ClosestEnemies || protocol === DroidProtocols.FurthestEnemies) {

        finalCommand = protocol;
      } else {

        const filteredScans = finalRadarScans.filter(this.protocolScanFilterConditions[protocol]);

        if (filteredScans.length) {
          finalRadarScans = filteredScans;
        }
      }
    });

    return this.findEnemyTarget(finalCommand, finalRadarScans);
  }

  private findEnemyTarget(protocol: DroidProtocols, finalRadarScans: RadarScan[]): RadarCoordinates {
    if (finalRadarScans.length === 1) {
      return finalRadarScans[0].coordinates;
    }

    const intialCoordinates =
      protocol === DroidProtocols.FurthestEnemies ? { x: 0, y: 0 } : { x: 100, y: 100 };

    return finalRadarScans.reduce((enemyCoordinates: RadarCoordinates, radarScan: RadarScan) => {
      // Check edge cases
      if (radarScan.enemies.number <= 0 || distanceToCoordinates(radarScan.coordinates) > 100) {
        return enemyCoordinates;
      }

      // Find furthest enemy
      if (
        protocol === DroidProtocols.FurthestEnemies &&
        distanceToCoordinates(radarScan.coordinates) > distanceToCoordinates(enemyCoordinates)
      ) {
        return radarScan.coordinates;
      }

      // Find closest enemy
      if (
        protocol === DroidProtocols.ClosestEnemies &&
        distanceToCoordinates(radarScan.coordinates) < distanceToCoordinates(enemyCoordinates)
      ) {
        return radarScan.coordinates;
      }

      return enemyCoordinates;
    }, intialCoordinates);
  }
}
