import Table4 from "@/components/manageterm/Table4";
import FilterTerm from "@/components/manageterm/FilterTerm"
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
      </div>
  ) 

};

export default internTerm;
