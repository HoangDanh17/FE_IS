
import Filter from "@/components/manageintern/FilterIntern";
import InternTable from "@/components/manageintern/InternTable";

const manageIntern = () => {
  return (
    <div>
      <div className="filter">
        <Filter/>
      </div>

      <div className="table" style={{ marginTop: "10px", }}>
        {/* <DataTable /> */}
       <InternTable/>
      </div>

      <div>
        {/* <ButtonGroup /> */}
      </div>

    </div>
  );
};

export default manageIntern;
