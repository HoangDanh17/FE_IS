import z from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  "project-id": z.string(),
  "assigned-to": z.string(),
  "assigned-name": z.string(),
  "assigned-code": z.string(),
  "is-approved": z.string(),
  status: z.string(),
  name: z.string(),
  description: z.string(),
  "estimated-effort": z.string(),
  "Actual-effort": z.string(),
});

export const TaskPageSchema = z.object({
  page: z.number(),
  psize: z.number(),
  items: z.number(),
  pages: z.number(),
});

export const TaskFilterSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
  "assginee-name": z.string().optional(),
  "assginee-code": z.string().optional(),
  "is-approved": z.string().optional(),
});

export const TaskListRes = z.object({
  paging: TaskPageSchema,
  filter: TaskFilterSchema,
  data: z.array(TaskSchema),
  status: z.number(),
});

export type TaskListResType = z.TypeOf<typeof TaskListRes>;
export type TaskType = z.TypeOf<typeof TaskSchema>;
export type TaskFilterType = z.TypeOf<typeof TaskFilterSchema>;
