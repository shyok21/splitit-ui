import React from "react";
import { HomepageBody } from "../styles/components/GroupPage";
import CommonAppBar from "../utils/Appbar";

const FriendsPage = () => {

    return (
        <HomepageBody>
            <CommonAppBar section='friends' expense={24000} />
        </HomepageBody>
    );
};

export default FriendsPage;
