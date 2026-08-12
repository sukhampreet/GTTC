/**
 * Route segments relative to ROUTES.smartParking ('/smart-parking').
 * Kept local to the module so Sprint 1's global ROUTES/navigation config
 * does not need to change for Sprint 7.
 */
export const SMART_PARKING_PATHS = {
  home: '',
  liveParking: 'live-parking',
  entryGate: 'entry-gate',
  exitGate: 'exit-gate',
  vehicleList: 'vehicle-list',
  parkingSlots: 'parking-slots',
  barrierControl: 'barrier-control',
  visitorVehicle: 'visitor-vehicle',
  anpr: 'anpr',
  parkingReports: 'parking-reports',
  vehicleHistory: 'vehicle-history',
} as const;
