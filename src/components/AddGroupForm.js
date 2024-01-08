import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { addExpenseGroup } from "../utils/api";
const useStyles = makeStyles((theme) => ({
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AddGroupForm = ({ open, handleClose, addToExpenseGroupList }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server or perform actions
    setLoading(true);
    const expenseGroup = await addExpenseGroup(formData);
    addToExpenseGroupList(expenseGroup);
    setFormData({
      name: "",
      description: "",
    });
    setLoading(false);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="add-expense-title"
    >
      <DialogTitle id="add-expense-title">
        {"Let's add a new expense group"}
      </DialogTitle>
      <DialogContent>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container direction="column" alignItems="center">
            <TextField
              required
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={12}
                  sx={{ marginLeft: "2px" }}
                  color="inherit"
                />
              )}
            </Button>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupForm;
