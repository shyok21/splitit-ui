import React, { useState } from "react";
import { AppBar, Toolbar, Slide, Box, Select } from "@mui/material";
import { Constant } from "../utils/constant";
import { HomepageBody, HomepageHeading3, appBarStyle } from "../styles/components/GroupPage";
import GroupIcon from '@mui/icons-material/Group';

const GroupPage = () => {
    const [showSidebar, setShowSidebar] = useState(false);

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <HomepageBody>
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
            {/* Sidebar */}
            <Slide direction="left" in={showSidebar} mountOnEnter unmountOnExit>
                <Box
                    sx={{
                        width: '90%', // Adjust the width as needed
                        backgroundColor: 'black', // Set your desired background color
                        opacity: 0.5,
                        height: "100vh",
                        position: "fixed",
                        top: 0,
                        right: 0,
                        zIndex: 1000, // Ensure it's above other content
                    }}
                >
                    <select style={{width: '100%', height: '100%', marginTop: '70px'}}>
                        <option>option 1</option>
                        <option>option 1</option>
                        <option>option 1</option>
                        <option>option 1</option>
                    </select>
                </Box>
            </Slide>
        </HomepageBody>
    );
};

export default GroupPage;
