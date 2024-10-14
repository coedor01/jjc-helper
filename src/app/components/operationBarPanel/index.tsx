import { SxProps, Theme } from "@mui/system";
import { Box } from "@mui/material";

interface OperationBarPanelProps {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
}


const OperationBarPanel: React.FC<OperationBarPanelProps> = (
  { sx, children }
) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // 纵向排列
        gap: '10px', // 图标之间的间距
        padding: '5px',
        ...sx,
      }}
    >
      {children}
    </Box>
  )
}

export default OperationBarPanel;