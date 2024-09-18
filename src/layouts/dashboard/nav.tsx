import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';

import { Typography, Box, Collapse, ListItem, ListItemButton } from '@mui/material';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

// import { WorkspacesPopover } from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';


// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string | null; // Allow null for parent items
    title: string;
    parent: boolean;
    icon: React.ReactNode;
    info?: React.ReactNode;
    data?: {
      title: string;
      path: string;
      icon: React.ReactNode; // Same adjustment for nested items
    }[];
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
  isOpen
}: NavContentProps & { layoutQuery: Breakpoint, isOpen: boolean }) {
  const theme = useTheme();
  const [openIndex, setOpenIndex] = useState<number|null>(null); // To keep track of which parent item is expanded

  useEffect(()=>{
    if(!isOpen){
      setOpenIndex(null);
    }
  }, [isOpen])
  const handleToggle = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
    {/* <Box sx={{ display: 'flex' }}> */}
        {/* Sidebar Drawer */}
              <Drawer
                variant="permanent"
                sx={{
                width: isOpen ? 'var(--layout-nav-vertical-width)' : 70,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isOpen ? 'var(--layout-nav-vertical-width)' : 70,
                    transition: 'width 0.3s ease',
                    overflowX: 'hidden',
                },
                }}
              >
              <NavContent 
                data={data} 
                slots={slots} 
                workspaces={workspaces} 
                isOpen={isOpen} 
                openIndex={openIndex} 
                handleToggle={handleToggle}  
              />
            </Drawer>
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
  isOpen,
}: NavContentProps & { open: boolean; onClose: () => void; isOpen: boolean }) {
  const pathname = usePathname();
  // console.log("data: ", data);

  const [openIndex, setOpenIndex] = useState<number|null>(null); // To keep track of which parent item is expanded

  useEffect(()=>{
    if(!isOpen){
      setOpenIndex(null);
    }
  }, [isOpen])
  const handleToggle = (index:number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent 
        data={data} 
        slots={slots} 
        workspaces={workspaces} 
        isMobile
        openIndex={openIndex} 
        handleToggle={handleToggle}  
      />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ 
  data, 
  slots, 
  workspaces, 
  sx, 
  isOpen, 
  openIndex, 
  handleToggle,
  isMobile,
}: NavContentProps & { openIndex?: number|null, handleToggle?: (index: number) => void, isOpen?: boolean, isMobile?: boolean}) {
  const pathname = usePathname();
  // console.log("data: ", data);

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', pl: 2}}>
         <Logo />
         {(isOpen || isMobile) && 
           <Box sx={{pl: 2}} flexGrow={1}>
              <Typography variant="h6" flexGrow={1}>
                MyERApp Admin Panel
              </Typography>
           </Box>
         }
      </Box>

      {slots?.topArea}

      {/* <WorkspacesPopover data={workspaces} sx={{ my: 2 }} /> */}
    <Scrollbar fillContent>
      <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column">
        <Box component="ul" gap={0.5} display="flex" flexDirection="column">
          {data.map((item:any, index:number) => {
            const isActived = item.path === pathname;
            
            return (
              <Box key={item.title}>
                {/* Non-parent items */}
                {!item.parent ? (
                  <ListItem disableGutters disablePadding>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      sx={{
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: 'var(--layout-nav-item-color)',
                        minHeight: 'var(--layout-nav-item-height)',
                        ...(isActived && {
                          fontWeight: 'fontWeightSemiBold',
                          bgcolor: 'var(--layout-nav-item-active-bg)',
                          color: 'var(--layout-nav-item-active-color)',
                          '&:hover': {
                            bgcolor: 'var(--layout-nav-item-hover-bg)',
                          },
                        }),
                      }}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>
                        {/* <img src={item.icon.props.src} alt={item.title} style={{ width: '100%', height: '100%' }} />
                         */}
                         {item.icon}
                      </Box>

                      {(isOpen || isMobile) && 
                        <Box component="span" flexGrow={1}>
                          {item.title}
                        </Box>
                      }
                    </ListItemButton>
                  </ListItem>
                ) : (
                  /* Parent items */
                  <>
                    <ListItem disableGutters disablePadding>
                      <ListItemButton
                        disableGutters
                        onClick={() => handleToggle?.(index)} // Toggle the parent
                        sx={{
                          pl: 2,
                          py: 1,
                          gap: 2,
                          pr: 1.5,
                          borderRadius: 0.75,
                          typography: 'body2',
                          fontWeight: 'fontWeightMedium',
                          color: 'var(--layout-nav-item-color)',
                          minHeight: 'var(--layout-nav-item-height)',
                        }}
                      >
                        <Box component="span" sx={{ width: 24, height: 24 }}>
                          {/* <img src={item.icon.props.src} alt={item.title} style={{ width: '100%', height: '100%' }} /> */}
                          {item.icon}
                        </Box>

                        {(isOpen || isMobile) && 
                          <Box component="span" flexGrow={1}>
                            {item.title}
                          </Box>
                        }
                        {(isOpen || isMobile) &&<Box component="span" sx={{ width: 24, height: 24 }}>
                          {openIndex === index ? <ArrowDropDown />: <ArrowRight />}
                        </Box>}
                      </ListItemButton>
                    </ListItem>

                    {/* Render nested items if the parent is expanded */}
                    <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
                      <Box component="ul" sx={{ pl: 4 }}>
                        {item.data?.map((subItem:any) => (
                          <ListItem key={subItem.title} disableGutters disablePadding>
                            <ListItemButton
                              disableGutters
                              component={RouterLink}
                              href={subItem.path}
                              sx={{
                                pl: 2,
                                py: 1,
                                gap: 2,
                                pr: 1.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                fontWeight: 'fontWeightMedium',
                                color: 'var(--layout-nav-item-color)',
                                minHeight: 'var(--layout-nav-item-height)',
                                ...(subItem.path === pathname && {
                                  fontWeight: 'fontWeightSemiBold',
                                  bgcolor: 'var(--layout-nav-item-active-bg)',
                                  color: 'var(--layout-nav-item-active-color)',
                                  '&:hover': {
                                    bgcolor: 'var(--layout-nav-item-hover-bg)',
                                  },
                                }),
                              }}
                            >
                              <Box component="span" sx={{ width: 24, height: 24 }}>
                                {/* <img src={subItem.icon.props.src} alt={subItem.title} style={{ width: '100%', height: '100%' }} /> */}
                                {subItem.icon}
                              </Box>

                              {(isOpen || isMobile) && 
                                <Box component="span" flexGrow={1}>
                                  {subItem.title}
                                </Box>
                              }
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Box>
                    </Collapse>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Scrollbar>
    {slots?.bottomArea}
    </>
  );
}
