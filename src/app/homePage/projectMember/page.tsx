import FilterProjectMember from "@/components/projectMember/Filter";
import TableProjectMember from "@/components/projectMember/Table";
import ButtonGroupMemberProject from "@/components/projectMember/ButtonGroup";
const projectMember = () => {
    return (
        <div>
            <div className="filter">
                <FilterProjectMember />
            </div>

            <div className="table" style={{ marginTop: "10px" }}>
                <TableProjectMember />
            </div>

            <div>
                <ButtonGroupMemberProject />
            </div>

        </div>
    );
};

export default projectMember;


