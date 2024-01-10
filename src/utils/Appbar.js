import { AppBar, Box, Slide, Toolbar } from "@mui/material";
import React, { useState } from "react";
import { IconFactory } from "../components/IconFactory";
import NavSection from "../components/NavSection";
import { HomepageHeading3, appBarStyle } from "../styles/components/GroupPage";
import { Constant } from "./constant";

import { getFormattedCost } from "./utility";

const CommonAppBar = ({ section, expense }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <React.StrictMode>
      <AppBar position="fixed" style={appBarStyle}>
        <Toolbar>
          {expense > 0 ? (
            <HomepageHeading3>
              Collect your{" "}
              <span style={{ color: Constant.greenTextColor }}>
                {getFormattedCost(expense)}
              </span>{" "}
              vibes!
            </HomepageHeading3>
          ) : (
            <HomepageHeading3>
              Pay{" "}
              <span style={{ color: Constant.redTextColor }}>
                {getFormattedCost(-expense)}
              </span>{" "}
              vibes!
            </HomepageHeading3>
          )}
          <IconFactory
            id={section}
            style={{
              fontSize: "1.8em",
              width: "20vw",
              cursor: "pointer",
              textAlign: "center",
            }}
            onClick={handleSidebarToggle}
          />
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Slide direction="left" in={showSidebar} mountOnEnter unmountOnExit>
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#0d0c39",
            height: "100vh",
            position: "fixed",
            marginTop: "75px",
            right: 0,
            zIndex: 1000,
          }}
        >
          <NavSection section={section} />
        </Box>
      </Slide>
    </React.StrictMode>
  );
};
export default CommonAppBar;
