import { DroidEnemies } from './droidEnemies';
import { DroidProtocols } from './droidProtocols';
import { RadarCoordinates } from './radarCoordinates';

export interface RadarScan {
  coordinates: RadarCoordinates;

  enemies: {
    type: DroidEnemies;
    number: number;
  };

  allies?: number;
}

export interface RadarPostBody {
  protocols: DroidProtocols[];
  scan: RadarScan[];
}
