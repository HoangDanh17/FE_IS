import http from "@/lib/http";
import {
  CreateProjectResType,
  CreateProjectType,
  ProjectFilterType,
  ProjectListResType,
} from "@/schemaValidations/project.schema";

const projectApiRequest = {
  getListProject: (psize: number, body: ProjectFilterType) =>
    http.post<ProjectListResType>(
      `/api/v1/project/get?page=1&psize=${psize}`,
      body
    ),
  createProject: (body: CreateProjectType) =>
    http.post<CreateProjectResType>("api/v1/project", body),
};

export default projectApiRequest;
