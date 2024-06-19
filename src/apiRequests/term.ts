import http from "@/lib/http";
import { CreateTermResType, CreateTermType, TermFilterType, TermListResType, UpdateTermResType, UpdateTermType } from "@/schemaValidations/term.schema";
import { object } from "zod";


const termApiRequest = {
    getListTerm: (page:number, psize: number, body: TermFilterType | null ) =>
    http.get<TermListResType>(
      `/api/v1/ojts?page=${page}&psize=${psize}
      ${body?.id ? `&id=${body.id}` : ""}
      ${body?.university ? `&university=${body.university}` : ""}
      ${body?.semester ? `&semester=${body.semester}` : ""}    
      `
    ),
    createTerm: (body: CreateTermType) =>
      http.post<CreateTermResType>("/api/v1/ojts", body),
    updateTerm: (body: UpdateTermType) => {
      const { id, ...updateBody } = body;
      return http.put<UpdateTermResType>(
        `/api/v1/ojts/${body.id}`,
        updateBody
      );
    },
   deleteTerm: (body: string) =>
      http.delete<CreateTermResType>(`/api/v1/ojts/${body}`),
  // getTermById: (id: number) =>
  //   http.get<TermSchemaType>(`/api/v1/ojts/${id}`),

//   // Fetch a paginated list of terms
//   getTermPage: (page: number, psize: number, ) =>
//     http.get<TermPageSchemaType>(`/api/v1/ojts?page=${page}&psize=${psize}`),

//   // Create a new term
//   createTerm: (body: CreateTermBodyType) =>
//     http.post<CreateTermResType>("/api/v1/ojts", body),

//   // Update an existing term
//   updateTerm: (id: string, body: UpdateTermForApiType) =>
//     http.put<CreateTermResType>(`/api/v1/ojts/${id}`, body),

//   // Delete a term by ID
//   deleteTerm: (id: number) =>
//     http.delete<{ status: number; message: string }>(`/api/v1/ojts/${id}`),
};
  
  export default termApiRequest;