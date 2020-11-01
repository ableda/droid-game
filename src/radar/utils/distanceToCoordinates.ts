import { RadarCoordinates } from '../types/radarCoordinates';

export const distanceToCoordinates = (coordinates: RadarCoordinates): number => {
  return Math.hypot(coordinates.x, coordinates.y);
};
