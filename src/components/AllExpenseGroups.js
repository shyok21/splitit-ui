import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function AllExpenseGroups() {
  const user = useSelector((state) => state.user.value);

  return <Typography variant="h1"> Hello {user.name} </Typography>;
}
