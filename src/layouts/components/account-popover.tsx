import type { IconButtonProps } from '@mui/material/IconButton';

import { useState, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import { Avatar, Box, CardContent, ClickAwayListener, Grid, Popper, Tab, Tabs, Tooltip, Stack, Paper, Typography, IconButton } from '@mui/material';
import { LogoutOutlined, SettingsOutlined, VerifiedOutlined,  VerifiedUserRounded, WalletOutlined, EditOutlined } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';

import { Iconify } from 'src/components/iconify';
import { useRouter, usePathname } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';

import { a11yProps } from 'src/utils/helper';
import { RootState } from 'src/store/reducers';
import { logoutUserRequest } from 'src/store/actions';
import Transitions from './Profile/components/Transitions';
import MainCard from './Profile/components/MainCard';
import ProfileTab from './Profile/ProfileTab';
import SettingTab from './Profile/SettingTab';
import { TabPanel } from './Profile/components/Util';



// ----------------------------------------------------------------------

export type AccountPopoverProps = IconButtonProps & {
  data?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    info?: React.ReactNode;
  }[];
};


export function AccountPopover({ data = [], sx, ...other }: AccountPopoverProps) {
  const router = useRouter();
  const theme:any = useTheme();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.LoginReducer);

  
  const pathname = usePathname();

  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);
  const profileId = 1;
  const profileData=[
    {
      label: 'View Profile',
      href: `/profile/${profileId}`,
      icon: <VerifiedUserRounded width={22} />,
    },
    {
      label: 'Edit Profile',
      href: `/edit-profile/${profileId}`,
      icon: <EditOutlined width={22} />,
    },
    {
      label: 'Social Profile',
      href: '/social-profile-link',
      icon: <VerifiedUserRounded width={22} />,
    },
    {
      label: 'Billing',
      href: '/payment',
      icon: <WalletOutlined width={22} />,
    },
  ];
  const settingData =[
    {
      label: 'Home',
      href: '/',
      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
    },
    {
      label: 'Profile',
      href: '/profile/alsdkfjlsdfjls',
      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
    },
    {
      label: 'Settings',
      href: '#',
      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
    },
  ];
  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  
  const handleLoginBtnClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  const [value, setValue] = useState(0);

  const handleChange = (event:any, newValue:any) => {
    setValue(newValue);
  };

  const logoutHandler = async (e:any) => {
    // e.preventDefault();
    handleClosePopover();
    dispatch(logoutUserRequest());
  }
  const iconBackColorOpen = 'grey.100';
  return (
    <>
      {isLoggedIn ? (
        <IconButton
          onClick={handleOpenPopover}
          sx={{
            p: '2px',
            width: 40,
            height: 40,
            background: `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
            ...sx,
          }}
          {...other}
        >
          <Avatar src={_myAccount.photoURL} alt={_myAccount.displayName} sx={{ width: 1, height: 1 }}>
            {_myAccount.displayName.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      ): (
        <IconButton
          onClick={()=>handleLoginBtnClick("/sign-in")}
          sx={{
            p: '2px',
            width: 100,
            height: 40,
            background: `conic-gradient(${theme.vars.palette.primary.light}, ${theme.vars.palette.warning.light}, ${theme.vars.palette.primary.light})`,
            ...sx,
            borderRadius: 2
          }}
          {...other}
        >
          Login
        </IconButton>
      )}

      <Popper
        placement="bottom-end"
        open={!!openPopover}
        anchorEl={openPopover}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="grow" position="top-right" in={!!openPopover} {...TransitionProps}>
            <Paper sx={{ boxShadow: theme.customShadows.z1, width: 290, minWidth: 240, maxWidth: { xs: 250, md: 290 } }}>
              <ClickAwayListener onClickAway={handleClosePopover}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        <Stack direction="row" spacing={1.25} alignItems="center">
                          {/* <Avatar alt="profile user" src={'/assets/images/images/users/avatar-1.png'} sx={{ width: 32, height: 32 }} /> */}
                          <Stack>
                            <Typography variant="h6">John Doe</Typography>
                            <Typography variant="body2" color="text.secondary">
                              UI/UX Designer
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={logoutHandler}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                        icon={<VerifiedOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Profile"
                        {...a11yProps(0)}
                      />
                      <Tab
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          textTransform: 'capitalize'
                        }}
                        icon={<SettingsOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                        label="Setting"
                        {...a11yProps(1)}
                      />
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <ProfileTab data={profileData} handleClosePopover={handleClosePopover} logoutHandler={logoutHandler} />
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <SettingTab data={settingData} handleClosePopover={handleClosePopover} />
                  </TabPanel>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>

      {/* <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { width: 200 },
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {_myAccount?.displayName}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {_myAccount?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

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
          {data.map((option) => (
            <MenuItem
              key={option.label}
              selected={option.href === pathname}
              onClick={() => handleClickItem(option.href)}
            >
              {option.icon}
              {option.label}
            </MenuItem>
          ))}
        </MenuList>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth color="error" size="medium" variant="text">
            Logout
          </Button>
        </Box>
      </Popover> */}
    </>
  );
}
