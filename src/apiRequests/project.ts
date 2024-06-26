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
  getListProject: (
    page: number,
    psize: number,
    body: ProjectFilterType | null
  ) =>
    http.get<ProjectListResType>(
      `/api/v1/projects?page=${page}&psize=${psize}${
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

  addPmIntoProject: (id: string, body: { "list-manager-id": string[] }) =>
    http.post<CreateProjectResType>(
      `api/v1/projects/${id}/project-managers`,
      body
    ),
  updateProject: (body: UpdateProjectApiType) => {
    const { id, ...updateBody } = body;
    return http.put<CreateProjectResType>(
      `/api/v1/projects/${body.id}`,
      updateBody
    );
  },

  getProject: () => http.get<ProjectListResType>(`/api/v1/projects`),
};

export default projectApiRequest;
