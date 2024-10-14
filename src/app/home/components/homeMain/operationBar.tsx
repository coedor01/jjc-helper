import * as React from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import OperationBarPanel from "@/app/components/operationBarPanel";
import FilterContext from "./context";

const OperationBar: React.FC = () => {
  const { open, setOpen } = React.useContext(FilterContext);

  const handleOnClickFilter = () => {
    setOpen(true)
    console.log(`open=${open}`)
  }

  return (
    <OperationBarPanel
      sx={{
        position: 'fixed',
        right: '5px',
        bottom: '10vh',
      }}
    >
      <Fab size="small" color="secondary" aria-label="add" onClick={handleOnClickFilter}>
        筛选
      </Fab>
      <Fab size="small" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </OperationBarPanel>
  )
};

export default OperationBar;
