import { Add } from "@mui/icons-material";
import { Box, Card, Fab, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getExpenseGroupsForUser } from "../utils/api";
import AddGroupForm from "./AddGroupForm";

const EmptyExpenseGroupMessage = () => {
  return (
    <Typography variant="h6" color="gray">
      No expense groups created, add your first expense group to continue
    </Typography>
  );
};

const ExpenseGroupCard = ({ name, description }) => {
  return (
    <Card
      sx={{
        padding: "20px",
        width: "100%",
      }}
    >
      <Grid container direction={"row"} alignItems={"center"}>
        <Grid xs={4}>
          <Typography variant="caption">{name}</Typography>
        </Grid>

        <Grid xs={2}></Grid>

        <Grid xs={6}>
          <Typography variant="caption" color={"gray"}>
            {description}
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default function AllExpenseGroups() {
  // const user = useSelector((state) => state.user.value);
  const [expenseGroups, setExpenseGroups] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const addExpenseGroup = (newExpenseGroup) => {
    setExpenseGroups((prevState) => {
      if (prevState.length) {
        return [...prevState, newExpenseGroup];
      } else {
        return [newExpenseGroup];
      }
    });
  };

  useEffect(() => {
    async function loadExpenseGroups() {
      const result = await getExpenseGroupsForUser();
      setExpenseGroups(result);
      console.log("Result", result);
    }

    const timer = setInterval(loadExpenseGroups, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <AddGroupForm
        open={showAddDialog}
        handleClose={() => setShowAddDialog(false)}
        addToExpenseGroupList={addExpenseGroup}
      />
      {expenseGroups.length === 0 && <EmptyExpenseGroupMessage />}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "100%",
        }}
      >
        {expenseGroups.map((group) => (
          <ExpenseGroupCard {...group} />
        ))}
      </Box>
      <Fab
        size="large"
        color="secondary"
        sx={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
        }}
        onClick={() => {
          console.log("Here");
          setShowAddDialog(true);
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
}
