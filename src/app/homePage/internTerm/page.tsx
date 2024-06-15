import TermTable from "@/components/manageterm/TermTable";
import FilterTerm from "@/components/manageterm/FilterTerm"

const internTerm = () => {
 return ( 
  <div>
  <div className="filter">
        <FilterTerm />
      </div>
  <div className="table" style={{ marginTop: "10px" }}>
        {/* <DataTable /> */}
        <TermTable/>
      </div>
      {/* <div>
        <ButtonGroup2 />
      </div> */}
      </div>
  ) 

};

export default internTerm;
