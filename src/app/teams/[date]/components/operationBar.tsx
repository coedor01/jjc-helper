import * as React from "react";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import OperationBarPanel from "@/app/components/operationBarPanel";
import Context from "../context";

const OperationBar: React.FC = () => {
  const {
    setDrawOpen,
  } = React.useContext(Context);

  const handleOnClickFilter = () => {
    setDrawOpen(true)
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
