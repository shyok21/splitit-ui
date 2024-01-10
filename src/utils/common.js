import { Flight, Home, Subscriptions } from "@mui/icons-material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const EXPENSE_GROUP_TYPES = {
  trip: {
    id: "trip",
    name: "Travel",
    icon: <Flight style={{ fontSize: "40vw", textAlign: "center" }} />,
  },
  household: {
    id: "household",
    name: "Household",
    icon: <Home style={{ fontSize: "40vw", textAlign: "center" }} />,
  },
  subscriptions: {
    id: "subscriptions",
    name: "Subscriptions",
    icon: <Subscriptions style={{ fontSize: "40vw", textAlign: "center" }} />,
  },
  other: {
    id: "other",
    name: "Other",
    icon: (
      <FormatListBulletedIcon
        style={{ fontSize: "40vw", textAlign: "center" }}
      />
    ),
  },
};
