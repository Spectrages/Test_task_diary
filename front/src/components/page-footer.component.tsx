// ========================== react ==========================
import React, { FC } from "react";

// ========================== next ==========================
import { useRouter } from "next/router";

// ========================== mui ==========================
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const PageFooterComp: FC = () => {
  const router = useRouter();
  return (
    <Box component={"footer"}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: "15px",
              cursor: "pointer",
            }}
            onClick={() => router.push(`/deeds`)}
          >
            © 2023 BEST APP FOR YOU DEEDS EVER
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default PageFooterComp;
