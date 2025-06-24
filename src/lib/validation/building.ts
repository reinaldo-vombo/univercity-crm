import * as z from 'zod';
export const buildingSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
});
export const roomSchema = z.object({
  roomNumber: z
    .string({
      required_error: 'Room number is required',
    })
    .min(1),
  floor: z.string({
    required_error: 'Floor is required',
  }),
  buildingId: z.string({
    required_error: 'Building is required',
  }),
});
export const updateRoomSchema = z.object({
  id: z.string(),
  roomNumber: z
    .string({
      required_error: 'Room number is required',
    })
    .min(1),
  floor: z.string({
    required_error: 'Floor is required',
  }),
  buildingId: z.string({
    required_error: 'Building is required',
  }),
});

export const updateBuildingSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
});
