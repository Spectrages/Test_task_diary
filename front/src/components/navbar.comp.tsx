// ========================== react ==========================
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
import { logout } from "../redux/sign-in/store/sign-in.slice";
import { AppDispatch } from "../redux/store";

// ========================== components ==========================
import SearchComponent from "./search.component";
import { LinksEnums } from "@/shared/links.enum";
import { useRouter } from "next/router";
import { startCase } from "lodash";
import {
  fetchAllUsers,
  fetchGetUserFriends,
} from "@/redux/friends/store/friends.slice";

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
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  // ===== auth check =====
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      dispatch(fetchAllUsers());
      dispatch(fetchGetUserFriends());
    }
  }, []);

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
        router.push("/sign-in");
        window.localStorage.removeItem("token");
        dispatch(logout());
        break;
      default:
        break;
    }
    setAnchorElUser(null);
  };

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
              sx={{
                mr: 2,
                display: { md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
              onClick={() => router.push(`/deeds`)}
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
              {isAuth ? (
                <>
                  <SearchComponent />
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
                    <MenuItem
                      value={SettingsEnum.logout}
                      onClick={() => handleCloseUserMenu(SettingsEnum.logout)}
                    >
                      <Typography textAlign="center">
                        {SettingsEnum.logout}
                      </Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => router.push("/sign-in")}
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
            <ListItemButton>
              <ListItemText
                primary={
                  <Typography sx={{ fontWeight: "bold" }}>Pages</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          {Object.keys(LinksEnums).map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemText
                  primary={`> ${startCase(item)}`}
                  sx={{ ml: 3 }}
                  onClick={() => router.push(`/${item}`)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default PageNavBarComp;
