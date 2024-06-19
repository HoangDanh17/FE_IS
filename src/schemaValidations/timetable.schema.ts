import z from "zod";

export const TimeTableSchema = z.object({
  id: z.string(),
  intern_name: z.string(),
  "student-code": z.string(),
  "office-time": z.string(),
  "est-start": z.string(),
  "est-end": z.string(),
  "act-start": z.string(),
  "act-end": z.string(),
  status: z.string(),
});

export const TimeTablePageSchema = z.object({
  page: z.number(),
  psize: z.number(),
  items: z.number(),
  pages: z.number(),
});

export const TimeTableFilterSchema = z.object({
  status: z.string().optional(),
  "intern-name": z.string().optional(),
  "office-time-from": z.string().optional(),
  "office-time-to": z.string().optional(),
});

export const TimeTableRes = z.object({
  paging: TimeTablePageSchema,
  filter: TimeTableFilterSchema,
  data: z.array(TimeTableSchema),
  status: z.number(),
});

export const CreateRes = z.object({
  status: z.number(),
  message: z.string(),
});

export type TimeTableResType = z.TypeOf<typeof TimeTableRes>;
export type CreateResType = z.TypeOf<typeof CreateRes>;
export type TimeTableType = z.TypeOf<typeof TimeTableSchema>;
export type TimeTableFilterType = z.TypeOf<typeof TimeTableFilterSchema>;
