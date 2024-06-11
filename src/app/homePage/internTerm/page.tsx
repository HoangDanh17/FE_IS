import Table4 from "@/components/manageterm/Table4";
import FilterTerm from "@/components/manageterm/FilterTerm"
import ButtonGroup2 from "@/components/manageterm/ButtonGroup2";
const internTerm = () => {
 return ( 
  <div>
  <div className="filter">
        <FilterTerm />
      </div>
  <div className="table" style={{ marginTop: "10px" }}>
        {/* <DataTable /> */}
        <Table4/>
      </div>
      <div>
        <ButtonGroup2 />
      </div>
      </div>
  ) 

};

export default internTerm;
