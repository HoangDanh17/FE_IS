import http from "@/lib/http";
import { 
    ProjectMemberResType,
    ProjectMemberFilterType,
    ProjectMemberListResType

 } from "@/schemaValidations/projectMember/projectMember.schema";

const projectMemberApiRequest = {
    getListProjectMember: (id: string, body: ProjectMemberFilterType) => {
        return http.get<ProjectMemberListResType>(`/api/v1/projects/${id}/member-in-project`);
    },   
    
};
export default projectMemberApiRequest;