import { Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { userUpdate } from "../redux/users";
import { HomepageBody } from "../styles/components/GroupPage";
import { CenteredDivContainer } from "../styles/components/common";
import { signInUser } from "../utils/api";
import { getToken, signIn } from "../utils/firebase";
export const LoginPage = () => {
  const dispatch = useDispatch();

  return (
    <HomepageBody>
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
    </HomepageBody>
  );
};
