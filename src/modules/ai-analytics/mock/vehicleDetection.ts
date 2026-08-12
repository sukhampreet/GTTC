import type { VehicleDetectionEvent } from '@/modules/ai-analytics/types';

export const vehicleDetectionEvents: VehicleDetectionEvent[] = [
  { id: 'VD-201', timestamp: '07:58:02', vehicleType: 'car', camera: 'CAM-Gate-01', location: 'Main Gate', confidence: 98.1, status: 'normal' },
  { id: 'VD-202', timestamp: '08:03:19', vehicleType: 'truck', camera: 'CAM-Gate-02', location: 'Loading Gate', confidence: 96.4, status: 'normal' },
  { id: 'VD-203', timestamp: '08:11:47', vehicleType: 'motorcycle', camera: 'CAM-Gate-01', location: 'Main Gate', confidence: 91.7, status: 'normal' },
  { id: 'VD-204', timestamp: '08:22:38', vehicleType: 'bus', camera: 'CAM-Gate-03', location: 'North Gate', confidence: 94.8, status: 'normal' },
  { id: 'VD-205', timestamp: '08:36:05', vehicleType: 'car', camera: 'CAM-Parking-02', location: 'Parking Entry', confidence: 82.3, status: 'review' },
  { id: 'VD-206', timestamp: '08:51:29', vehicleType: 'car', camera: 'CAM-Gate-01', location: 'Main Gate', confidence: 65.4, status: 'alert' },
  { id: 'VD-207', timestamp: '09:07:14', vehicleType: 'truck', camera: 'CAM-Gate-02', location: 'Loading Gate', confidence: 97.2, status: 'normal' },
];

export const vehicleTypeCounts = {
  car: vehicleDetectionEvents.filter((v) => v.vehicleType === 'car').length,
  truck: vehicleDetectionEvents.filter((v) => v.vehicleType === 'truck').length,
  motorcycle: vehicleDetectionEvents.filter((v) => v.vehicleType === 'motorcycle').length,
  bus: vehicleDetectionEvents.filter((v) => v.vehicleType === 'bus').length,
};
