import http from "@/lib/http";
import {
  TaskFilterType,
  TaskListResType,
} from "@/schemaValidations/task.schema";

const taskApiRequest = {
  getListTask: (
    id: string | undefined,
    page: number,
    psize: number,
    body: TaskFilterType | null
  ) =>
    http.get<TaskListResType>(
      `/api/v1/projects/${id}/tasks?page=${page}&psize=${psize}${
        body?.name ? `&name=${body.name}` : ""
      }${body?.status ? `&status=${body.status}` : ""}${
        body?.["assginee-name"]
          ? `&assginee-name=${body?.["assginee-name"]}`
          : ""
      }${
        body?.["assginee-code"]
          ? `&assginee-code=${body?.["assginee-code"]}`
          : ""
      }${body?.["is-approved"] ? `&is-approved=${body?.["is-approved"]}` : ""}`
    ),
};

export default taskApiRequest;
