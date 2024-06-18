import z from "zod";

// Define the individual account schema
export const ProjectMemberSchema = z.object({
  id: z.string(),
  "user-name": z.string(),
  "student-code": z.string(),
  avatar: z.string(),
  "ojt-semester-university": z.string(),
  "technical_skills": z.string(),
});

// Define the pagination schema
// export const AccountPageSchema = z.object({
//   page: z.number(),
//   psize: z.number(),
//   items: z.number(),
//   pages: z.number(),
// });

// Define the filter schema
export const ProjectMemberFilterSchema = z.object({
  "project-id": z.string(),
  // username: z.string().optional(),  
});

// Define the full response schema
export const ProjectMemberListRes = z.object({
  // paging: AccountPageSchema,
  filter: ProjectMemberFilterSchema,
  data: z.array(ProjectMemberSchema),
  status: z.number(),
});

export const ProjectMemberRes = z.object({
  status: z.number(),
  message: z.string(),
});


export type ProjectMemberListResType = z.TypeOf<typeof ProjectMemberListRes>;
export type ProjectMemberFilterType = z.TypeOf<typeof ProjectMemberFilterSchema>;
export type ProjectMemberResType = z.TypeOf<typeof ProjectMemberRes>;
export type ProjectMemberType = z.TypeOf<typeof ProjectMemberSchema>;