import type { McpDevice } from '@/modules/fire-emergency/types';

export const mcpDevices: McpDevice[] = [
  { id: 'MCP-001', mcpId: 'MCP-A-101', building: 'Block A', floor: 'Ground Floor', zone: 'Zone A', status: 'normal', activationCount: 0, resetStatus: 'reset', health: 'online' },
  { id: 'MCP-002', mcpId: 'MCP-A-205', building: 'Block A', floor: '2nd Floor', zone: 'Zone A', status: 'normal', activationCount: 1, resetStatus: 'reset', health: 'online' },
  { id: 'MCP-003', mcpId: 'MCP-B-110', building: 'Block B', floor: '1st Floor', zone: 'Zone B', status: 'normal', activationCount: 0, resetStatus: 'reset', health: 'online' },
  { id: 'MCP-004', mcpId: 'MCP-C-201', building: 'Block C', floor: '2nd Floor', zone: 'Zone C', status: 'activated', activationCount: 2, resetStatus: 'pending-reset', health: 'online' },
  { id: 'MCP-005', mcpId: 'MCP-D-101', building: 'Block D', floor: 'Ground Floor', zone: 'Zone D', status: 'normal', activationCount: 0, resetStatus: 'reset', health: 'online' },
  { id: 'MCP-006', mcpId: 'MCP-C-G01', building: 'Block C', floor: 'Ground Floor', zone: 'Zone C', status: 'fault', activationCount: 0, resetStatus: 'reset', health: 'offline' },
];
