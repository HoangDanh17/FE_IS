import http from "@/lib/http";
import {
  CreateIntern,
  CreateInternResType,
  CreateInternType,
  InternFilterType,
  InternListResType,
  InternSchemaType,
  UpdateInternResType,
  UpdateInternType,
} from "@/schemaValidations/intern.schema";

const internApiRequest = {
  getListIntern: (page: number, psize: number, body: InternFilterType | null) =>
    http.get<InternListResType>(
      `/api/v1/interns?page=${page}&psize=${psize}
      ${body?.["user-name"] ? `&username=${body["user-name"]}` : ""}
      ${body?.email ? `&email=${body.email}` : ""}
      ${body?.["student-code"] ? `&student-code=${body["student-code"]}` : ""}
      ${body?.["ojt-semester"] ? `&ojt-semester=${body["ojt-semester"]}` : ""}
      ${body?.gender ? `&gender=${body.gender}` : ""}
      ${body?.address ? `&username=${body.address}` : ""}`
    ),
  createIntern: (body: CreateInternType) =>
    http.post<CreateInternResType>("/api/v1/interns", body),
  updateIntern: (body: UpdateInternType) => {
    const {
      "intern-id": internId,
      "account-id": account,
      ...updateBody
    } = body;
    return http.put<UpdateInternResType>(
      `/api/v1/interns/${internId}`,
      updateBody
    );
  },
  deleteIntern: (body: string) =>
    http.delete<CreateInternResType>(`/api/v1/ojts/${body}`),
};

export default internApiRequest;
