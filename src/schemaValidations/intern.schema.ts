import z from "zod";

// Define the individual project schema
export const InternSchema = z.object({
  "account-id": z.string().optional(),
  "intern-id": z.string().optional(),
  "user-name": z.string().optional(),
  email: z.string().optional(),
  "student-code": z.string().optional(),
  avatar: z.string().optional(),
  gender: z.string().optional(),
  "date-of-birth": z.string().optional(),
  "phone-number": z.string().optional(),
  address: z.string().optional(),
  "ojt-semester": z.string().optional(),
});

export const InternPageSchema = z.object({
    page: z.number(),
    psize: z.number(),
    items: z.number(),
    pages: z.number(),
  });

  // Define the filter schema
export const InternFilterSchema = z.object({
  "user-name": z.string().optional(),
  email: z.string().optional(),
  "student-code": z.string().optional(),
  "ojt-semester": z.string().optional(),
  gender: z.string().optional(),
  "phone-number": z.string().optional(),
  address: z.string().optional(),
  });

  export const InternListRes = z.object({
    paging: InternPageSchema,
    filter: InternFilterSchema,
    data: z.array(InternSchema),
    status: z.number(),
  });

  export const CreateIntern = z.object({
  "user-name": z.string().optional(),
  email: z.string().optional(),
  "student-code": z.string().optional(),
  avatar: z.string().optional(),
  gender: z.string().optional(),
  "date-of-birth": z.string().optional(),
  "phone-number": z.string().optional(),
  address: z.string().optional(),
  "ojt-id": z.string().optional(),
  password: z.string().optional(),
  });

  export const CreateInternRes = z.object({
    status: z.number(),
    message: z.string(),
  });

  export const UpdateIntern = z.object({
    "account-id": z.string().optional(),
    "intern-id": z.string().optional(),
    "user-name": z.string().optional(),
    email: z.string().optional(),
    "student-code": z.string().optional(),
    avatar: z.string().optional(),
    gender: z.string().optional(),
    "date-of-birth": z.string().optional(),
    "phone-number": z.string().optional(),
    address: z.string().optional(),
    "ojt-semester": z.string().optional(),
  });

  export const UpdateInternRes = z.object({
    status: z.number(),
    message: z.string(),
  });

  export type InternSchemaType = z.TypeOf<typeof InternSchema>;
  export type InternListResType = z.TypeOf<typeof InternListRes>;
  export type InternFilterType = z.TypeOf<typeof InternFilterSchema>;
  export type CreateInternResType = z.TypeOf<typeof CreateInternRes>;
  export type CreateInternType = z.TypeOf<typeof CreateIntern>;
  export type UpdateInternResType = z.TypeOf<typeof UpdateInternRes>;
  export type UpdateInternType = z.TypeOf<typeof UpdateIntern>;
  
  