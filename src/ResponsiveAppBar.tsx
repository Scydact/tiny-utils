import { AppBar, Box, Button, Container, Drawer, IconButton, List, ListItem, Menu, MenuItem, ToggleButton, ToggleButtonGroup, Toolbar, Tooltip, Typography } from "@mui/material";
import { DarkMode, LightMode, MenuOpen, Settings, SettingsBrightness, StoreMallDirectory } from '@mui/icons-material'
import { memo, useState } from "react";
import { LinkProps, useMatch, useNavigate, useResolvedPath } from "react-router-dom";

type PaletteMode = 'light' | 'dark' | 'auto';

type Page = {
  path: string,
  name: string,
}

type NavProps = {
  darkmode: PaletteMode,
  setDarkmode: (s: PaletteMode) => any,
  pages: Page[]
}


const ResponsiveAppBar = memo(({ pages, darkmode, setDarkmode }: NavProps) => {
  const TITLE = 'Text Utils'
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(p => !p);
  };

  const theming = <ToggleButtonGroup
    value={darkmode}
    exclusive
    onChange={(evt, m) => setDarkmode(m)} >
    <ToggleButton value='light'><LightMode /></ToggleButton>
    <ToggleButton value='auto'><SettingsBrightness /></ToggleButton>
    <ToggleButton value='dark'><DarkMode /></ToggleButton>
  </ToggleButtonGroup>

  const drawerContent = <Box>
    <List>
      <ListItem>
        <Typography variant="h6">Theme</Typography>
      </ListItem>
      <ListItem>
        {theming}
      </ListItem>

      <ListItem>
        <Typography variant="h6">Utils</Typography>
      </ListItem>

      <PageDrawerBtn page={{ name: 'Index', path: '/' }} />
      {pages.map((page) => <PageDrawerBtn key={page.path} page={page} />)}
    </List>
  </Box>

  const small = <>
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer}
        color="inherit">
        <MenuOpen />
      </IconButton>
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={() => setOpen(false)}>
        {drawerContent}
      </Drawer>
    </Box>

    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      {TITLE}
    </Typography>
  </>


  const large = <>
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
      {TITLE}
    </Typography>


    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {pages.map((page) => <PageBtn key={page.path} page={page} />)}
    </Box>

    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
      {theming}
    </Box>
  </>

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {small}
          {large}
        </Toolbar>
      </Container>
    </AppBar>
  );
});

function PageBtn({ page }: { page: Page }) {
  const resolved = useResolvedPath(page.path)
  const match = useMatch({ path: resolved.pathname, end: true })
  const navigate = useNavigate();

  return <Button
    key={page.name}
    sx={{ my: 2, color: 'white', display: 'block' }}
    disabled={!!match}
    onClick={() => navigate(page.path)}>
    {page.name}
  </Button>
}

function PageDrawerBtn({ page }: { page: Page }) {
  const resolved = useResolvedPath(page.path)
  const match = useMatch({ path: resolved.pathname, end: true })
  const navigate = useNavigate();

  return <ListItem
    button
    key={page.path}
    selected={!!match}
    onClick={() => navigate(page.path)}>
    {page.name}
  </ListItem>
}

export default ResponsiveAppBar;