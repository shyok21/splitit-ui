import React, { useEffect, useState } from "react";
import { HomepageBody, groupPageStyle, groupStyle } from "../styles/components/GroupPage";
import CommonAppBar from "../utils/Appbar";
import { getExpenseGroupsForUser } from "../utils/api";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useSelector } from "react-redux";
import { LoginPage } from "./LoginPage";
import AddGroupForm from "./AddGroupForm";
import { Fab } from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const Group = (props) => {
    return (
        <a style={groupStyle} href={`/group/${props.id}`}>
            <FormatListBulletedIcon style={{fontSize: '40vw', textAlign: 'center'}} />
            <p>{props.name}</p>
        </a>
    )
}

const GroupPage = () => {
    const user = useSelector((state) => state.user.value);
    const [ groups, setGroups ] = useState(null);
    const [showAddDialog, setShowAddDialog] = useState(false);

    const addExpenseGroup = (newExpenseGroup) => {
        setGroups((prevState) => {
          if (prevState.length) {
            return [...prevState, newExpenseGroup];
          } else {
            return [newExpenseGroup];
          }
        });
    };

    useEffect(() => {
        getExpenseGroupsForUser()
            .then(data => setGroups(data))
            .catch(error => console.log('Error in fetching data', error));
    }, []);

    if(user)
        return (
            <HomepageBody>
                <CommonAppBar section='group' expense={24000} />
                {
                    !groups && <h1>Loading</h1>
                }
                <div style={groupPageStyle}>
                {
                    groups && groups.map(group => <Group name={group.name} id={group.id} />)
                }
                </div>
                <AddGroupForm
                    open={showAddDialog}
                    handleClose={() => setShowAddDialog(false)}
                    addToExpenseGroupList={addExpenseGroup}
                    style={{ width: '100px', height: '100px' }}
                />
                <Fab
                    size="large"
                    color="secondary"
                    sx={{
                        position: "absolute",
                        bottom: "10px",
                        right: "10px",
                    }}
                    onClick={() => {
                        setShowAddDialog(true);
                    }}
                >
                    <GroupAddIcon />
                </Fab>
            </HomepageBody>
        );
    return <LoginPage />
};

export default GroupPage;
