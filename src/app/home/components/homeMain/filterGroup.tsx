import * as React from 'react';
import { padding, SxProps, Theme } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import FilterContext from './context';
import { OrderByEnum, TeamTypeEnum, TimeTypeEnum, ClientTypeEnum } from './const';
import { EnumType } from 'typescript';



interface ListMenuItemProps {
  value: string,
  setValue: (value: string) => void;
  options: string[],
}

const ListMenuItem: React.FC<ListMenuItemProps> = (
  { value, setValue, options }
) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
  ) => {
    setValue(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'background.paper' }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="hello"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={value}
          />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={option === value}
            onClick={(event) => handleMenuItemClick(event, option)}
          >
            {value}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}


interface FilterGroup {
  sx?: SxProps<Theme>;
}

const FilterGroup: React.FC<FilterGroup> = ({ sx }) => {
  const {
    orderBy,
    setOrderBy,
    teamType,
    setTeamType,
    clientType,
    setClientType,
    timeType,
    setTimeType,
  } = React.useContext(FilterContext);

  const handleChangeOrderBy = (event: SelectChangeEvent) => {
    setOrderBy(event.target.value as string);
  };

  const handleChangeTeamType = (event: SelectChangeEvent) => {
    setTeamType(event.target.value as string);
  };

  const handleChangeClientType = (event: SelectChangeEvent) => {
    setClientType(event.target.value as string);
  };

  const handleChangeTimeType = (event: SelectChangeEvent) => {
    setTimeType(event.target.value as string);
  };

  const orderByOptions = [OrderByEnum.DEAFULT, OrderByEnum.PIGEON_POINTS, OrderByEnum.TIME];


  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row', // 横向排列
      alignItems: 'center', // 垂直居中
      gap: 2, // 增加间距
      padding: 2,
      ...sx,
    }}>
      <ListMenuItem
        value={OrderByEnum.DEAFULT}
        setValue={setOrderBy}
        options={orderByOptions}
      />

    </Box>
  );
}

export default FilterGroup;
