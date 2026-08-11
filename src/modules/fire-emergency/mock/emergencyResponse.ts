import type { EmergencyChecklistItem, EmergencyLevel, EmergencyTimelineStep } from '@/modules/fire-emergency/types';

export const currentEmergencyLevel: EmergencyLevel = 'elevated';

export const emergencyResponseTeam = [
  { name: 'Rahul Nair', role: 'Fire Warden — Block C', status: 'On Site' },
  { name: 'Vikram Joshi', role: 'Security Shift Supervisor', status: 'En Route' },
  { name: 'External Fire Brigade', role: 'Municipal Fire Service', status: 'Notified' },
];

export const nearestExit = 'East Stairwell — Block C, Level 2';
export const nearestCamera = 'CAM-C-207 — Level 2 East Corridor';
export const assemblyPoint = 'Assembly Point 2 — Block C Parking Forecourt';

export const incidentTimeline: EmergencyTimelineStep[] = [
  { id: 'IT-1', time: '09:12:55', description: 'Smoke detected — SM-014, Block C Level 2', done: true },
  { id: 'IT-2', time: '09:13:10', description: 'Alert escalated to Fire Warden', done: true },
  { id: 'IT-3', time: '09:14:02', description: 'Zone C evacuation notice broadcast', done: true },
  { id: 'IT-4', time: '09:15:40', description: 'Fire Warden confirming on-site status', done: false },
  { id: 'IT-5', time: 'Pending', description: 'All-clear confirmation', done: false },
];

export const emergencyChecklist: EmergencyChecklistItem[] = [
  { id: 'CK-1', label: 'Confirm alarm source and location', done: true },
  { id: 'CK-2', label: 'Notify fire warden and security supervisor', done: true },
  { id: 'CK-3', label: 'Broadcast evacuation announcement to affected zone', done: true },
  { id: 'CK-4', label: 'Dispatch nearest camera feed to command center', done: false },
  { id: 'CK-5', label: 'Confirm assembly point headcount', done: false },
  { id: 'CK-6', label: 'Log incident and close out event', done: false },
];
