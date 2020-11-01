export enum DroidProtocols {
  ClosestEnemies = 'closest-enemies', // Se deberá priorizar el punto más cercano en el que haya enemigos.
  FurthestEnemies = 'furthest-enemies', // Se deberá priorizar el punto más lejano en el que haya enemigos.
  AssitAllies = 'assist-allies', // Deberan de priorizarse los puntos en los que exista algún aliado.
  AvoidCrossfire = 'avoid-crossfire', // No debe de atacarse ningún punto en el que haya algún aliado.
  PriotizeMech = 'prioritize-mech', // Debe de atacarse unmech si se encuentra. En caso negativo, cualquier otro tipo de objetivo será válido.
  AvoidMech = 'avoid-mech', // No debe de atacarse ningún enemigo del tipomech
}
