import http from "@/lib/http";
import { ProjectMemberListResType, MemberNotInProFilterType, MemberNotInProListResType, ProjectMemberResType } from "@/schemaValidations/projectMember/projectMember.schema";

const projectMemberApiRequest = {
    getMemberInProject: (id: string) => {
        return http.get<ProjectMemberListResType>(`/api/v1/projects/${id}/member-in-project`);
    },

    getMemberNotInProject: (id: string, psize: number, body: MemberNotInProFilterType | null) =>
        http.get<MemberNotInProListResType>(
            `/api/v1/projects/${id}/member-outside-project?page=1&psize=${psize}
            ${body?.["user-name"] ? `&user-name=${body["user-name"]}` : ""}
            ${body?.["student-code"] ? `&student-code=${body["student-code"]}` : ""}
            ${body?.semester ? `&semester=${body.semester}` : ""}
            ${body?.university ? `&university=${body?.university}` : ""}
            `
        ),

    addMemberIntoProject: (id: string | null, body: { "mem-id": string}) =>
        http.post<ProjectMemberResType>(
            `api/v1/projects/${id}/member`,
            body
        ),

    deleteMemberInProject: (projectID: string, memberID: string) =>
        http.delete(`/api/v1/accounts/${projectID}`)
};
export default projectMemberApiRequest;