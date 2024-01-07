import { Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../redux/users";
import { CenteredDivContainer, Page } from "../styles/components/common";
import { signInUser } from "../utils/api";
import { getToken, signIn } from "../utils/firebase";
import AllExpenseGroups from "./AllExpenseGroups";

export default function HomePage() {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  return (
    <Page
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <CenteredDivContainer>
        <Typography variant="h3">SPLIT IT</Typography>

        {user ? (
          <AllExpenseGroups />
        ) : (
          <GoogleButton
            type="dark"
            onClick={async () => {
              await signIn();
              const idToken = await getToken();
              const user = await signInUser(idToken);
              if (!user) {
                alert("Failed to add user");
              } else {
                dispatch(userUpdate(user));
              }
            }}
          />
        )}
      </CenteredDivContainer>
    </Page>
  );
}
