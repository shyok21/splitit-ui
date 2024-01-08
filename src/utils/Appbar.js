import { HomepageHeading3, appBarStyle } from "../styles/components/GroupPage";
import { Constant } from "./constant";
import GroupIcon from '@mui/icons-material/Group';
import { AppBar, Toolbar, Slide, Box } from "@mui/material";
import NavSection from "../components/NavSection";
import React from "react";
import { useState } from "react";

const CommonAppBar = ({section}) => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };
    
    return (
        <React.StrictMode>
        <AppBar position="fixed" style={appBarStyle}>
            <Toolbar>
                <HomepageHeading3>
                    Collect your <span style={{ color: Constant.greenTextColor }}>₹24,000</span> vibes!
                </HomepageHeading3>
                <GroupIcon
                    style={{ fontSize: "1.8em", width: '20vw', cursor: 'pointer', textAlign: 'center' }}
                    onClick={handleSidebarToggle}
                />
            </Toolbar>
        </AppBar>
        <Toolbar />

        <Slide direction="left" in={showSidebar} mountOnEnter unmountOnExit>
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#0d0c39',
                    height: "100vh",
                    position: "fixed",
                    marginTop: '75px',
                    right: 0,
                    zIndex: 1000
                }}
            >
            <NavSection section={section} />
                    
            </Box>
        </Slide>
        </React.StrictMode>
    )
}
export default CommonAppBar;