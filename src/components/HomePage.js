import { Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../redux/users";
import { CenteredDivContainer, Page } from "../styles/components/common";
import { signInUser } from "../utils/api";
import { getToken, signIn } from "../utils/firebase";
import AllExpenseGroups from "./AllExpenseGroups";
const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <CenteredDivContainer>
      <Typography variant="h3">SPLIT IT</Typography>
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
    </CenteredDivContainer>
  );
};

export default function HomePage() {
  const user = useSelector((state) => state.user.value);

  return (
    <Page
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      {user ? <AllExpenseGroups /> : <LoginPage />}
    </Page>
  );
}
