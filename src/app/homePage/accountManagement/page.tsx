import FilterAccount from "@/components/accountManagement/Filter";
import TableAccount from "@/components/accountManagement/Table";
import ButtonGroupAccount from "@/components/accountManagement/ButtonGroup";
import { Hidden } from "@mui/material";

const accountManagement = () => {
  return (
    <div>
      <div className="filter">
        <FilterAccount />
      </div>

      <div className="table" style={{ marginTop: "10px" }}>
        <TableAccount />
      </div>

      <div>
        <ButtonGroupAccount />
      </div>

    </div>
  );
};

export default accountManagement;
