import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { addExpenseGroup } from "../utils/api";
import { EXPENSE_GROUP_TYPES } from "../utils/common";

const Form = styled("form")(({ theme }) => ({
  "& .MuiTextField-root": {
    margin: theme.spacing(1),
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const AddGroupForm = ({ open, handleClose, addToExpenseGroupList }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
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
    setLoading(true);
    const expenseGroup = await addExpenseGroup(formData);
    addToExpenseGroupList(expenseGroup);
    setFormData({
      name: "",
      description: "",
      type: "",
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
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Description"
                fullWidth
                name="description"
                value={formData.description}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleChange}
                  name="type"
                >
                  {Object.keys(EXPENSE_GROUP_TYPES).map((key) => (
                    <MenuItem value={EXPENSE_GROUP_TYPES[key].id}>
                      {EXPENSE_GROUP_TYPES[key].name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <SubmitButton
                type="submit"
                variant="contained"
                color="primary"
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
              </SubmitButton>
            </Grid>
          </Grid>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGroupForm;
