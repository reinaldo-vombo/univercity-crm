import * as z from 'zod';
export const buildingSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
});
export const roomSchema = z
  .object({
    endRoom: z.coerce
      .number({
        required_error: 'Numero da ultima sala é obrigatório',
      })
      .min(1, { message: 'Número inicial inválido' }),
    startRoom: z.coerce
      .number({
        required_error: 'Numero da ultima sala é obrigatório',
      })
      .min(1, { message: 'Número final inválido' }),
    floor: z.string({
      required_error: 'Andar é obrigatório',
    }),
    buildingId: z.coerce.number({
      required_error: 'Building is required',
    }),
  })
  .refine((data) => data.startRoom <= data.endRoom, {
    message: 'O número inicial não pode ser maio que final',
    path: ['endRoom'],
  });
export const updateRoomSchema = z.object({
  id: z.coerce.number(),
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
export const blukUpdateRoomShema = z.object({
  ids: z.array(z.coerce.number()),
  floor: z.string().optional(),
});

export const updateBuildingSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
});
