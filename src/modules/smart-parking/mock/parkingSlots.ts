import type { ParkingSlot, ParkingZoneId, VehicleType } from '@/modules/smart-parking/types';

const ZONES: ParkingZoneId[] = ['Zone A', 'Zone B', 'Zone C', 'Zone D'];
const FLOORS = ['Ground Floor', '1st Floor', '2nd Floor'];
const VEHICLE_TYPES: VehicleType[] = ['Car', 'SUV', 'Bike', 'Truck', 'EV'];

const OCCUPANT_VEHICLES = [
  'KA-05-MN-4521', 'TN-09-AB-1234', 'KA-01-BZ-7788', 'MH-12-CD-3345', 'DL-08-EF-9081',
  'KA-03-GH-5567', 'AP-16-IJ-2210', 'TN-22-KL-6634', 'KA-05-MO-1123', 'KL-07-PQ-8890',
  'KA-09-RS-4432', 'TS-09-TU-7765', 'KA-04-VW-3321', 'MH-04-XY-5589', 'KA-02-ZA-1190',
  'TN-01-BC-6612', 'KA-41-DE-2298', 'KL-14-FG-7743',
];

const DURATIONS = ['12 min', '38 min', '1 hr 05 min', '2 hr 20 min', '45 min', '3 hr 10 min', '18 min', '55 min'];
const RESERVED_FOR = ['VIP Visitor', 'Management', 'EV Charging', 'Reserved — Block A'];

function buildSlots(): ParkingSlot[] {
  const slots: ParkingSlot[] = [];
  let slotIndex = 0;

  for (const zone of ZONES) {
    for (let i = 1; i <= 13; i++) {
      slotIndex++;
      const floor = FLOORS[i % FLOORS.length];
      const slotNumber = `${zone.replace('Zone ', '')}-${String(i).padStart(2, '0')}`;
      const cycle = slotIndex % 10;

      let status: ParkingSlot['status'];
      if (cycle === 0) status = 'disabled';
      else if (cycle === 1 || cycle === 5) status = 'reserved';
      else if (cycle % 2 === 0) status = 'occupied';
      else status = 'available';

      const isOccupied = status === 'occupied';
      const isReserved = status === 'reserved';

      slots.push({
        id: `PS-${String(slotIndex).padStart(3, '0')}`,
        slotNumber,
        zone,
        floor,
        status,
        vehicleNumber: isOccupied ? OCCUPANT_VEHICLES[slotIndex % OCCUPANT_VEHICLES.length] : null,
        vehicleType: isOccupied ? VEHICLE_TYPES[slotIndex % VEHICLE_TYPES.length] : null,
        reservedFor: isReserved ? RESERVED_FOR[slotIndex % RESERVED_FOR.length] : null,
        duration: isOccupied ? DURATIONS[slotIndex % DURATIONS.length] : null,
      });
    }
  }

  return slots;
}

export const parkingSlots: ParkingSlot[] = buildSlots();
