import { Constant } from "../utils/constant"
import { HomepageBody, HomepageHeading3, appBarStyle } from "../styles/components/Homepage"
import React from "react";
import { AppBar, Toolbar } from "@mui/material";

const Homepage = () => {
    return (
    <HomepageBody>
        <AppBar position="fixed" style={appBarStyle}>
        <Toolbar>
            <HomepageHeading3>
                Collect your <span style={{color: Constant.greenTextColor}}>₹24,000</span> vibes!
            </HomepageHeading3>
            <i 
                class="fa fa-group" 
                style={{ fontSize: "1.8em", margin: '20px', cursor: 'pointer' }}
            />
        </Toolbar>
        </AppBar>
        <Toolbar />
    </HomepageBody>
    )
}

export default Homepage;