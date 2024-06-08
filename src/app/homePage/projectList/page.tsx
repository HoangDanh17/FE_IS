import FilterTable from "@/components/projectList/FilterTable";
import ProjectListTable from "@/components/projectList/ProjectListTable";

const projectList = () => {
  return (
    <div>
      <FilterTable></FilterTable>
      <ProjectListTable></ProjectListTable>
    </div>
  );
};

export default projectList;
