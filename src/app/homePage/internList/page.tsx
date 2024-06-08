import Filter from "@/components/manageintern/FilterIntern";
import DataTable from "@/components/manageintern/Table";
import ButtonGroup from "@/components/manageintern/ButtonGroup";
import Table2 from "@/components/manageintern/Table2";
const manageIntern = () => {
  return (
    <div>
      <div className="filter">
        <Filter />
      </div>

      <div className="table" style={{ marginTop: "10px" }}>
        {/* <DataTable /> */}
        <Table2/>
      </div>

      <div>
        <ButtonGroup />
      </div>

    </div>
  );
};

export default manageIntern;
