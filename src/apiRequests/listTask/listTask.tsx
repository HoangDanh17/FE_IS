import http from "@/lib/http";
import {
    AccountResType,
    CreateAccountType,
    UpdateAccountType,
    AccountListResType,
    AccountFilterType,
} from "@/schemaValidations/accountManagement/account.schema";

import { ListTaskFilterType, ListTaskAllResType, CreateTaskType, ListTaskResType, UpdateTaskType } from "@/schemaValidations/listTask/listTask.schema";
import {ProjectMemberListResType } from "@/schemaValidations/projectMember/projectMember.schema";
const listTaskApiRequest = {
    // đang gán cứng id 
    getListTask: (page: number, psize: number, body: ListTaskFilterType | null) =>
        http.get<ListTaskAllResType>(
            `/api/v1/projects/proj1/tasks?page=${page}&psize=${psize}
            ${body?.["assignee-code"] ? `&assignee-code=${body["assignee-code"]}` : ""}
            ${body?.["assignee-name"] ? `&assignee-name=${body["assignee-name"]}` : ""}
            ${body?.["is-approved"] ? `&is-approved=${body["is-approved"]}` : ""}
            ${body?.name ? `&name=${body?.name}` : ""}
            ${body?.status ? `&status=${body?.status}` : ""}           
            `
        ),

    // Đang gán cứng id
    getMemberInProject: () =>
        http.get<ProjectMemberListResType>(
            `/api/v1/projects/proj1/member-in-project`
        ),

    // Đang gán cứng id
    createTask: (body: CreateTaskType) =>
        http.post<ListTaskResType>("/api/v1/projects/proj1/tasks", body),

    updateTask: (body: UpdateTaskType) => {
        const { taskId, ...updateBody } = body;
        return http.put<ListTaskResType>(
            `/api/v1/projects/proj1/tasks/${body.taskId}`,
            updateBody
        );
    },

};
export default listTaskApiRequest;