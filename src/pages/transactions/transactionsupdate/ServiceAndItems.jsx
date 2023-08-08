import { Button } from "@mui/material";
import "./list.scss";
import { Link } from "react-router-dom";

const ServiceAnItems = () => {
  return (
    <div className="listContainer">
      <div className="datatable">
        <div className="datatableTitle">
          Services and Items
          <Button className="link">Add Items</Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceAnItems;
