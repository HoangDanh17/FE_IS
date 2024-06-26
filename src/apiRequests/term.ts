import http from "@/lib/http";
import {
  CreateTermResType,
  CreateTermType,
  TermFilterType,
  TermListResType,
  UpdateTermResType,
  UpdateTermType,
} from "@/schemaValidations/term.schema";

const termApiRequest = {
  getListTerm: (
    page: number | null,
    psize: number | null,
    body: TermFilterType | null
  ) =>
    http.get<TermListResType>(
      `/api/v1/ojts?
      ${page !== null ? `&page=${page}` : ""}
      ${psize !== null ? `&psize=${psize}` : ""}
      ${body?.id ? `&id=${body.id}` : ""}
      ${body?.university ? `&university=${body.university}` : ""}
      ${body?.semester ? `&semester=${body.semester}` : ""}    
      `
    ),
  createTerm: (body: CreateTermType) =>
    http.post<CreateTermResType>("/api/v1/ojts", body),
  updateTerm: (body: UpdateTermType) => {
    const { id, ...updateBody } = body;
    return http.put<UpdateTermResType>(`/api/v1/ojts/${body.id}`, updateBody);
  },
  deleteTerm: (body: string) =>
    http.delete<CreateTermResType>(`/api/v1/ojts/${body}`),
};

export default termApiRequest;
