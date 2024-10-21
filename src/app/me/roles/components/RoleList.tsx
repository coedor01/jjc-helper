"use client";

import { Avatar, Box, Grid2, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Role } from "../schemas";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

function NewRoleItem() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Box
      onClick={() => {
        router.push(pathname + "/create");
      }}
      sx={{
        backgroundColor: "white", // 白色背景
        width: "100%", // 宽度占满父容器
        marginTop: 1,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>添加角色</Typography>
        <AddIcon />
      </Box>
    </Box>
  );
}

function RoleItem({ item }: { item: Role }) {
  return (
    <Box
      sx={{
        backgroundColor: "white", // 白色背景
        width: "100%", // 宽度占满父容器
        m: 0.1,
      }}
    >
      <Grid2
        container
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center", // 垂直居中
        }}
      >
        <Grid2 size={2}>
          <Avatar alt={item.icon} src={item.icon} />
        </Grid2>
        <Grid2 size={10}>
          <Typography>{item.name}</Typography>
        </Grid2>
      </Grid2>
    </Box>
  );
}
interface Props {
  items: Role[];
}

const RoleList: React.FC<Props> = ({ items }) => {
  return (
    <Box>
      {items.map((item, index) => (
        <RoleItem key={index} item={item} />
      ))}
      <NewRoleItem />
    </Box>
  );
};

export default RoleList;
