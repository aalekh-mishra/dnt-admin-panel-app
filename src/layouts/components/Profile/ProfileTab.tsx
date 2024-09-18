
import { useCallback, useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { EditOutlined, LogoutOutlined, VerifiedUserRounded, WalletOutlined } from '@mui/icons-material';
import { usePathname, useRouter } from 'src/routes/hooks';
import { Divider, MenuItem, menuItemClasses, MenuList } from '@mui/material';



// ==============================|| HEADER PROFILE - PROFILE TAB ||============================== //

export default function ProfileTab({data, handleClosePopover, logoutHandler}:any) {
  const router = useRouter();
  const pathname = usePathname();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClickItem = useCallback(
    (index:any, path: string) => {
      handleClosePopover();
      setSelectedIndex(index);
      router.push(path);
    },
    [ handleClosePopover, router]
  );

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <MenuList
          disablePadding
          sx={{
            p: 1,
            gap: 0.5,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              color: 'text.secondary',
              '&:hover': { color: 'text.primary' },
              [`&.${menuItemClasses.selected}`]: {
                color: 'text.primary',
                bgcolor: 'action.selected',
                fontWeight: 'fontWeightSemiBold',
              },
            },
          }}
        >
          {data.map((option:any, i:any) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem( i, option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />
      
      <ListItemButton selected={selectedIndex === 222} onClick={logoutHandler}>
        <ListItemIcon>
          <LogoutOutlined />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
}

