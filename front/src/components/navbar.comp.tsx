// ========================== react ==========================
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

// ========================== mui ==========================
import { styled } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Container,
  CssBaseline,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// ========================== enums ==========================
import { ISettings, SettingsEnum } from "../shared/settings.enum";

// ========================== store ==========================
import { logout } from "../pages/sign-in/store/sign-in.slice";
import { AppDispatch } from "../redux/store";

// ========================== components ==========================
import SearchComponent from "./search.component";
import { LinksEnums } from "@/shared/links.enum";

// ========================== initial settings ==========================
const drawerWidth = 200;

// ========================== local interface ==========================
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// ========================== styled ==========================
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const PageNavBarComp = () => {
  // ===== hooks =====
  const dispatch = useDispatch<AppDispatch>();

  // ===== local states =====
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // ===== i18n =====

  // ===== auth check =====
  //const token = window.localStorage.getItem("token");
  const token = "2423422424234234";
  let isAuth = true;
  // if (token) {
  //   isAuth = true;
  // }

  // ===== handlers =====
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (field: string) => {
    switch (field) {
      case SettingsEnum.logout:
        dispatch(logout());
        window.localStorage.removeItem("token");
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

  const enumSettings = Object.values(SettingsEnum).slice(0, 3);

  return (
    <Box component={"nav"} sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            data-testid="drawer-open-button-test"
          >
            <MenuIcon />
          </IconButton>

          {/* toolbar */}
          <Container
            maxWidth="xl"
            sx={{
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <SearchComponent label="Search" />

              {isAuth ? (
                <>
                  <Tooltip
                    title="Open settings"
                    data-testid="open-settings-button-test"
                  >
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <VerifiedUserIcon
                        fontSize="large"
                        sx={{
                          color: "success.light",
                        }}
                      />
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    data-testid="hidden-menu-test"
                  >
                    {enumSettings.map((item) => (
                      <MenuItem
                        value={item}
                        key={item}
                        onClick={() => handleCloseUserMenu(item)}
                        data-testid={`hidden-menu-${item}`}
                      >
                        <Typography textAlign="center">{item}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => console.log("/auth/signIn")}
                  data-testid="sign-in-btn-test"
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* side menu */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onMouseLeave={() => setOpen(false)}
        data-testid="drawer-test"
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            data-testid="drawer-close-button-test"
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />

        {/* links */}
        <List>
          <ListItem key={"Pages"} disablePadding>
            <ListItemButton onClick={() => console.log("/")}>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>Pages</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {Object.values(LinksEnums).map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemText primary={`> ${item}`} sx={{ ml: 3 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default PageNavBarComp;
