import z from "zod";

// Define the individual project schema
export const ProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.string(),
  "start-date": z.string(),
  duration: z.string(),
});

// Define the pagination schema
export const ProjectPageSchema = z.object({
  page: z.number(),
  psize: z.number(),
  items: z.number(),
  pages: z.number(),
});

// Define the filter schema
export const ProjectFilterSchema = z.object({
  name: z.string().optional(),
  status: z.string().optional(),
  "order-by": z.string().optional(),
  "start-date-from": z.string().optional(),
  "start-date-to": z.string().optional(),
});

// Define the full response schema
export const ProjectListRes = z.object({
  paging: ProjectPageSchema,
  filter: ProjectFilterSchema,
  data: z.array(ProjectSchema),
  status: z.number(),
});

export const CreateProject = z.object({
  description: z.string(),
  duration: z.string(),
  name: z.string(),
  "start-at": z.union([z.string().nullable(), z.date().nullable()]),
});

export const UpdateProject = z.object({
  status: z.string(),
  id: z.string(),
  description: z.string(),
  duration: z.string(),
  name: z.string(),
  "start-at": z.union([z.string().nullable(), z.date().nullable()]),
});

export const UpdateProjectForApi = z.object({
  status: z.string(),
  id: z.string(),
  description: z.string(),
  duration: z.string(),
  name: z.string(),
  "start-date": z.union([z.string().nullable(), z.date().nullable()]),
});

export const CreateProjectRes = z.object({
  status: z.number(),
  message: z.string(),
});

export const MemberInProject = z.object({
  id: z.string(),
  "user-name": z.string(),
  email: z.string(),
});

export const MemberInProjectRes = z.object({
  status: z.number(),
  data: z.array(MemberInProject),
});

export type ProjectListResType = z.TypeOf<typeof ProjectListRes>;
export type ProjectFilterType = z.TypeOf<typeof ProjectFilterSchema>;
export type CreateProjectResType = z.TypeOf<typeof CreateProjectRes>;
export type CreateProjectType = z.TypeOf<typeof CreateProject>;
export type UpdateProjectType = z.TypeOf<typeof UpdateProject>;
export type UpdateProjectApiType = z.TypeOf<typeof UpdateProjectForApi>;
export type MemberInProjectResType = z.TypeOf<typeof MemberInProjectRes>;
export type MemberInProjectType = z.TypeOf<typeof MemberInProject>;

// Example function simulating fetching projects data
