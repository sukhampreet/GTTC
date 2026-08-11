import type { ANPRDetection } from '@/modules/smart-parking/types';

export const anprDetections: ANPRDetection[] = [
  { id: 'AN-001', vehicleNumber: 'KA-33-AB-9967', detectionTime: '11:58 AM', camera: 'ANPR-Entry-01', gate: 'Main Entry Gate', direction: 'entry', confidence: 98.4, vehicleType: 'Car' },
  { id: 'AN-002', vehicleNumber: 'AP-16-IJ-2210', detectionTime: '11:42 AM', camera: 'ANPR-Entry-02', gate: 'Visitor Entry Gate', direction: 'entry', confidence: 96.1, vehicleType: 'Car' },
  { id: 'AN-003', vehicleNumber: 'KA-19-ST-3312', detectionTime: '11:51 AM', camera: 'ANPR-Exit-01', gate: 'Main Exit Gate', direction: 'exit', confidence: 97.8, vehicleType: 'Car' },
  { id: 'AN-004', vehicleNumber: 'MH-04-XY-5589', detectionTime: '11:08 AM', camera: 'ANPR-Exit-02', gate: 'Service Exit Gate', direction: 'exit', confidence: 89.2, vehicleType: 'Truck' },
  { id: 'AN-005', vehicleNumber: 'TN-38-UV-7756', detectionTime: '10:47 AM', camera: 'ANPR-Entry-01', gate: 'Main Entry Gate', direction: 'entry', confidence: 99.1, vehicleType: 'EV' },
  { id: 'AN-006', vehicleNumber: 'KA-22-WX-1145', detectionTime: '10:58 AM', camera: 'ANPR-Entry-02', gate: 'Visitor Entry Gate', direction: 'entry', confidence: 94.6, vehicleType: 'Car' },
  { id: 'AN-007', vehicleNumber: 'KL-09-YZ-8834', detectionTime: '09:12 AM', camera: 'ANPR-Exit-01', gate: 'Main Exit Gate', direction: 'exit', confidence: 92.3, vehicleType: 'Bike' },
  { id: 'AN-008', vehicleNumber: 'KA-51-PQ-2367', detectionTime: '06:45 AM', camera: 'ANPR-Entry-01', gate: 'Main Entry Gate', direction: 'entry', confidence: 95.9, vehicleType: 'Truck' },
  { id: 'AN-009', vehicleNumber: 'AP-28-RS-6690', detectionTime: '09:40 AM', camera: 'ANPR-Entry-02', gate: 'Visitor Entry Gate', direction: 'entry', confidence: 97.2, vehicleType: 'SUV' },
  { id: 'AN-010', vehicleNumber: 'KA-07-LM-9903', detectionTime: '11:20 AM', camera: 'ANPR-Exit-01', gate: 'Main Exit Gate', direction: 'exit', confidence: 88.7, vehicleType: 'Bike' },
  { id: 'AN-011', vehicleNumber: 'TN-14-JK-8821', detectionTime: '08:58 AM', camera: 'ANPR-Entry-01', gate: 'Main Entry Gate', direction: 'entry', confidence: 98.9, vehicleType: 'EV' },
  { id: 'AN-012', vehicleNumber: 'MH-20-NO-5541', detectionTime: '08:03 AM', camera: 'ANPR-Entry-02', gate: 'Visitor Entry Gate', direction: 'entry', confidence: 96.5, vehicleType: 'Car' },
  { id: 'AN-013', vehicleNumber: 'KL-14-FG-7743', detectionTime: '09:55 AM', camera: 'ANPR-Exit-02', gate: 'Service Exit Gate', direction: 'exit', confidence: 91.4, vehicleType: 'SUV' },
  { id: 'AN-014', vehicleNumber: 'KA-06-HI-4470', detectionTime: '08:15 AM', camera: 'ANPR-Entry-01', gate: 'Main Entry Gate', direction: 'entry', confidence: 97.6, vehicleType: 'Car' },
  { id: 'AN-015', vehicleNumber: 'KA-41-DE-2298', detectionTime: '11:02 AM', camera: 'ANPR-Entry-02', gate: 'Visitor Entry Gate', direction: 'entry', confidence: 93.8, vehicleType: 'Car' },
];
