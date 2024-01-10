import GoogleButton from "react-google-button";
import { useDispatch } from "react-redux";
import { TypeAnimation } from "react-type-animation";
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
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Want to split bills?",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Want to split trip expenses?",
            1000,
            "Want to split subscriptions?",
            1000,
            "Want to split anything?",
            1000,
          ]}
          wrapper="h5"
          speed={50}
          style={{ fontSize: "1.5em", display: "inline-block" }}
          repeat={Infinity}
        />
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
