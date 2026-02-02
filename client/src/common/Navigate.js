import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LogoutIcon from '@mui/icons-material/Logout';
import { CacheProvider } from "@emotion/react";
import { ltrCache } from "../theme";

const Navigate = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = [
    { path: "/", label: "המוצרים שלנו" },
    { path: "/Register", label: "הרשמה" },
    { path: "/Login", label: "כניסה" },
    { path: "/AllProducts", label: "ניהול מוצרים" },
    { path: "/AddProduct", label: "הוסף מוצר חדש" },
    { path: "/GetCart", label: <ShoppingCartCheckoutIcon /> },
  ];

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const drawer = (
    <CacheProvider value={ltrCache}>
    <Slide direction="left" in={mobileOpen} mountOnEnter unmountOnExit>
      <Box sx={{ width: 250, bgcolor: "#FFF0F5", height: "100%" }} onClick={toggleDrawer}>
        <List sx={{ pt: 4 }}>
          {links.map((link) => (
            <ListItem key={link.path} disablePadding>
              <ListItemButton
                component={NavLink}
                to={link.path}
                sx={{
                  "&.active": { backgroundColor: "#F9A5C0", borderRadius: "8px" },
                  mb: 1,
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
              to="/Logout"
              sx={{
                color: "#F45AA2",
                fontWeight: "bold",
              }}
            >
              Logout
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Slide>
    </CacheProvider>
  );

  return (
    <CacheProvider value={ltrCache}>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(90deg, #FFD3E2 0%, #C2E7FF 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#F45AA2", fontSize: "1.5rem" }}
          >
            ✨ Baby Shop ✨
          </Typography>

          {/* Desktop Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {links.map((link) => (
              <Button
                key={link.path}
                component={NavLink}
                to={link.path}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(244, 167, 193, 0.85)",
                  borderRadius: "25px",
                  textTransform: "none",
                  fontWeight: "bold",
                  px: 2,
                  "&.active": {
                    backgroundColor: "#E88BB0",
                    boxShadow: "0 4px 15px rgba(232,139,176,0.4)",
                  },
                  "&:hover": {
                    backgroundColor: "#F9A5C0",
                    transform: "scale(1.05)",
                    transition: "all 0.3s ease",
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
            <Button
              component={NavLink}
              to="/Logout"
              sx={{
                color: "#F45AA2",
                backgroundColor: "#fff",
                borderRadius: "25px",
                fontWeight: "bold",
                textTransform: "none",
                px: 2,
                "&:hover": {
                  backgroundColor: "#FEE6F0",
                  transform: "scale(1.05)",
                },
              }}
            >
              יציאה <LogoutIcon />               
            </Button>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            color="inherit"
            edge="start"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {drawer}

      {/* Spacer כדי שלא תוכן יתחת לנאבאר */}
      <Toolbar />
    </CacheProvider>
  );
};

export default Navigate;
