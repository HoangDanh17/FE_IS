import http from "@/lib/http";
import {
  CreateProjectResType,
  CreateProjectType,
  MemberInProjectResType,
  ProjectFilterType,
  ProjectListResType,
  UpdateProjectApiType,
} from "@/schemaValidations/project.schema";

const projectApiRequest = {
  getListPMInProject: (id: string) =>
    http.get<MemberInProjectResType>(`api/v1/projects/${id}/pm-in-project`),
  getListPMNotInProject: (id: string) =>
    http.get<MemberInProjectResType>(
      `/api/v1/projects/${id}/pm-outside-project`
    ),
  getListProject: (psize: number, body: ProjectFilterType | null) =>
    http.get<ProjectListResType>(
      `/api/v1/projects?page=1&psize=${psize}${
        body?.name ? `&name=${body.name}` : ""
      }${body?.status ? `&status=${body.status}` : ""}${
        body?.["start-date-from"]
          ? `&start-date-from=${body?.["start-date-from"]}`
          : ""
      }${
        body?.["start-date-to"]
          ? `&start-date-to=${body?.["start-date-to"]}`
          : ""
      }`
    ),
  createProject: (body: CreateProjectType) =>
    http.post<CreateProjectResType>("/api/v1/projects", body),
  updateProject: (body: UpdateProjectApiType) =>
    http.put<CreateProjectResType>(`/api/v1/projects/${body.id}`, body),
};

export default projectApiRequest;
